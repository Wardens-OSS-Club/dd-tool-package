# DD Tool Package

This is the TS CLI implementation of a tool that would allow to replicate a sequence of TXs

## Why

To share DD (e.g. How many emissions this week?)

To share POCs (e.g. How do I repro a potential attack?)

## Internals

- Usual TS for Code
- Ganache for Forking and Execution
- Ethers for Encoding and Decoding (human readable side)

## How to use

Check `/task/steps.json`

This is an example of how to get started

The globalLoop would receive a `DDSequence` to execute

Input and Output mappings are available to create variables

## Variables

Variables can be `concrete` or a `stateMapping`

Concrete is a real value (e.g your address)

StateMapping is a mapping to the `GlobalState`

With this system you can store intermediary results or pass hardcoded values

## Cheat-like basic implementation

Ganache offers Storage Rewrite and ETH Minting

Some global options in `AdditionalSettings` allow to use them (MOSTLY TODO)

## Architecture

`theGlobalLoop` is the entire global logic

`executeOne` is the function that uses ganache, hidden away as it's a low level implementation

Ganache expects `ExecutableContract`s these are the low level version used internally and returns string/bytes as responses

This means the "Low level"  / execution is at the lowest level

The interpretation happens in the loop


## Study Guide

Understand `theLoop` and the `types`

Once you read these, everything should be more clear

## Contributing

Looking for help with tests

Help in writing the ERC20 Cheats

See TODO for more or reach out on twitter