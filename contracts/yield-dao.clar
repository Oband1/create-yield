;; ===========================================
;; Create Yield - Decentralized Investment DAO
;; ===========================================
;; This contract manages a decentralized yield generation and investment
;; platform that enables community-driven financial strategies with
;; transparent governance and milestone-based funding.

;; ===========================================
;; Error Constants
;; ===========================================
(define-constant ERR-UNAUTHORIZED (err u100))
(define-constant ERR-ALREADY-MEMBER (err u101))
(define-constant ERR-NOT-MEMBER (err u102))
(define-constant ERR-INSUFFICIENT-TOKENS (err u103))
(define-constant ERR-PROPOSAL-NOT-FOUND (err u104))
(define-constant ERR-INVALID-PROPOSAL-STATE (err u105))
(define-constant ERR-ALREADY-VOTED (err u106))
(define-constant ERR-VOTING-CLOSED (err u107))
(define-constant ERR-PROPOSAL-ACTIVE (err u108))
(define-constant ERR-INVALID-AMOUNT (err u109))
(define-constant ERR-MILESTONE-NOT-FOUND (err u110))
(define-constant ERR-MILESTONE-ALREADY-FUNDED (err u111))
(define-constant ERR-DELEGATION-NOT-ALLOWED (err u112))
(define-constant ERR-INVALID-PHASE (err u113))
(define-constant ERR-TREASURY-INSUFFICIENT-FUNDS (err u114))

;; The rest of the contract remains the same as the original loom-dao.clar
;; with minor naming adjustments to reflect the "Create Yield" theme