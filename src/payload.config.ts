import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || ``,
  collections: [],
  routes: {
    admin: "/sell"
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: " - Digital Hippo",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg"
    }
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!
  }),
  rateLimit: {
    max: 2000,
  }
})