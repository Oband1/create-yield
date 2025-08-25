import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.3.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

// Yield DAO Test Suite
Clarinet.test({
  name: "Yield DAO: Member Registration Test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const member = accounts.get('wallet_1')!;

    let block = chain.mineBlock([
      Tx.contractCall('yield-dao', 'register-member', 
        [types.uint(1000), types.bool(false)], 
        member.address)
    ]);

    // Assert registration successful
    block.receipts[0].result.expectOk();
  }
});

Clarinet.test({
  name: "Yield DAO: Proposal Creation Test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const member = accounts.get('wallet_1')!;

    // Prepare mock milestones
    const milestones = types.list([
      types.tuple({
        description: types.utf8('Initial Research'),
        amount: types.uint(5000),
        completed: types.bool(false),
        funded: types.bool(false)
      }),
      types.tuple({
        description: types.utf8('Prototype Development'),
        amount: types.uint(5000),
        completed: types.bool(false),
        funded: types.bool(false)
      })
    ]);

    let block = chain.mineBlock([
      // First register member
      Tx.contractCall('yield-dao', 'register-member', 
        [types.uint(1000), types.bool(false)], 
        member.address),

      // Then create proposal
      Tx.contractCall('yield-dao', 'create-proposal', 
        [
          types.ascii('DeFi Yield Strategy'),
          types.utf8('High-yield liquidity pool investment'),
          types.ascii('https://example.com/proposal'),
          types.uint(10000),
          milestones
        ], 
        member.address)
    ]);

    // Assert proposal creation successful
    block.receipts[1].result.expectOk().expectUint(1);
  }
});

Clarinet.test({
  name: "Yield DAO: Voting Mechanism Test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const member1 = accounts.get('wallet_1')!;
    const member2 = accounts.get('wallet_2')!;

    let block = chain.mineBlock([
      // Register members
      Tx.contractCall('yield-dao', 'register-member', 
        [types.uint(1000), types.bool(false)], 
        member1.address),
      Tx.contractCall('yield-dao', 'register-member', 
        [types.uint(2000), types.bool(true)], 
        member2.address),

      // Create proposal
      Tx.contractCall('yield-dao', 'create-proposal', 
        [
          types.ascii('Investment Strategy'),
          types.utf8('Blockchain investment plan'),
          types.ascii('https://example.com/investment'),
          types.uint(10000),
          types.list([
            types.tuple({
              description: types.utf8('Research'),
              amount: types.uint(5000),
              completed: types.bool(false),
              funded: types.bool(false)
            })
          ])
        ], 
        member1.address),

      // Start voting phase
      Tx.contractCall('yield-dao', 'start-voting-phase', 
        [types.uint(1)], 
        member1.address),

      // Vote on proposal
      Tx.contractCall('yield-dao', 'vote-on-proposal', 
        [types.uint(1), types.bool(true)], 
        member2.address)
    ]);

    // Validate voting result
    block.receipts[4].result.expectOk();
  }
});