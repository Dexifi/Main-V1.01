# Dexifi-Staking-Contract

## Install Dependencies

- Install `node` and `yarn`
- Install `script` as global command
- Confirm the solana wallet preparation. ex: `wallet.json`

## Usage

- Main script source for all functionality is here: `/lib/script.ts`
- Program account types are declared here: `/lib/types.ts`

Able to test the script functions working in this way.

- Change commands properly in the main functions of the `script.ts` file to call the other functions
- Run `yarn script` with parameters

# Features

## How to deploy this program?

First of all, you have to git clone in your PC.
In the folder `dexifi-staking`, in the terminal

1. `yarn`

2. `anchor build`
   In the last sentence you can see:

```
To deploy this program:
  $ solana program deploy ./target/deploy/dexifi.so
The program address will default to this keypair (override with --program-id):
  ./target/deploy/dexifi-keypair.json
```

3. `solana-keygen pubkey ./target/deploy/dexifi.json`
4. You can get the pubkey of the `program ID : ex."5N...x6k"`
5. Please add this pubkey to the lib.rs
   `declare_id!("5N...x6k");`
6. Please add this pubkey to the Anchor.toml
   `dexifi = "5N...x6k"`
7. `anchor build` again
8. `solana program deploy ./target/deploy/dexifi.so`

<p align = "center">
Then, you can enjoy this program 
</p>
</br>

## How to use?

### A Project Owner

First of all, open the directory and `yarn`

#### Initialize project

```js
   yarn script init
```

#### Withdraw

```js
   yarn script withdraw -a <AMOUNT>
```

Admin can withdraw Tokens from the program vault.

### A Player

#### Get global status

```js
   yarn script status
```

#### Get user status

```js
   yarn script user-status -a <USER_ADDRESS>
```

Get status of user <USER_ADDRESS>.

#### Initialize user pool

```js
   yarn script init-user
```

#### Stake tokens

```js
   yarn script stake -a <AMOUNT> -l <LOCKER_INDEX>
```

Stake <AMOUNT> of DXE to <LOCKER_INDEX>.
<LOCKER_INDEX> is 0, 1, 2, 3.

#### Unstakable

```js
   yarn script unstakable -a <USER_ADDRESS>
```

Get unstakable <AMOUNT> of <USER_ADDRESS>.

#### Unstake

```js
   yarn script unstake -l <LOCKER_INDEX>
```

Unstake DXE from <LOCKER_INDEX>.
