import { withModele } from "@modele/core";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

/** @type {import('@modele/core')} */
const modeleConfig = {};

export default withModele(modeleConfig)(nextConfig);
