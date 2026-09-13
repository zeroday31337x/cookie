import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { StandardWalletAdapter } from "@solana/wallet-standard";
import type { WalletAdapterCompatibleStandardWallet } from "@solana/wallet-adapter-base";

export const COOKIE_RPC = process.env.NEXT_PUBLIC_COOKIE_CHAIN_RPC_URL || "https://rpc.cookiescan.io";
export const COOKIE_EXPLORER = process.env.NEXT_PUBLIC_COOKIE_CHAIN_EXPLORER_URL || "https://cookiescan.io";
export const COOKIE_GENESIS = "9wDaBRDgArEUpvhHxGguNkwozsZh4UpGZB9o2EoEcBB2";
export const MEMO_PROGRAM = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

type NightlyWindow = Window & { nightly?: { solana?: { standardWallet?: unknown; genesisHash?: string; changeNetwork?: (network: { genesisHash: string; url: string }) => Promise<void> } } };
export function getNightly() { return (window as NightlyWindow).nightly?.solana; }
export async function connectNightly() {
  const nightly = getNightly();
  if (!nightly?.standardWallet) throw new Error("NIGHTLY_NOT_INSTALLED");
  if (nightly.genesisHash !== COOKIE_GENESIS && nightly.changeNetwork) await nightly.changeNetwork({ genesisHash: COOKIE_GENESIS, url: COOKIE_RPC });
  const adapter = new StandardWalletAdapter({ wallet: nightly.standardWallet as WalletAdapterCompatibleStandardWallet });
  await adapter.connect();
  if (!adapter.publicKey) throw new Error("Nightly connected without an account.");
  return adapter;
}
export async function sendMemo(adapter: StandardWalletAdapter, memo: string) {
  if (!adapter.publicKey || !adapter.signTransaction) throw new Error("Wallet cannot sign transactions.");
  if (new TextEncoder().encode(memo).length > 480) throw new Error("Campaign payload is too large.");
  const connection = new Connection(COOKIE_RPC, "confirmed");
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  const tx = new Transaction({ blockhash, lastValidBlockHeight, feePayer: adapter.publicKey }).add(new TransactionInstruction({ programId: MEMO_PROGRAM, keys: [], data: Buffer.from(memo, "utf8") }));
  const signed = await adapter.signTransaction(tx);
  const signature = await connection.sendRawTransaction(signed.serialize(), { skipPreflight: false, maxRetries: 3 });
  const result = await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");
  if (result.value.err) throw new Error(`Cookie Chain rejected the transaction: ${JSON.stringify(result.value.err)}`);
  return signature;
}
export function explorerTx(signature: string) { return `${COOKIE_EXPLORER}/tx/${encodeURIComponent(signature)}`; }
export function friendlyWalletError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (message === "NIGHTLY_NOT_INSTALLED") return "Nightly Wallet was not detected. Install Nightly, enable it for this site, and try again.";
  if (/reject|declin|cancel/i.test(message)) return "The request was cancelled in Nightly. Nothing was submitted.";
  if (/blockhash/i.test(message)) return "The transaction expired before confirmation. Please submit it again.";
  if (/fetch|network|rpc/i.test(message)) return "Cookie Chain RPC is temporarily unreachable. Your wallet remains safe; please retry.";
  return message || "The wallet request could not be completed.";
}
