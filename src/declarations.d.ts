declare module "*.glb" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}