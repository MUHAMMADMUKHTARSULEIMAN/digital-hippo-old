import { PRODUCT_CATEGORIES } from "../../config/index";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price in USD",
      type: "number",
      min: 0,
      required: true
    },
    {
      name: "details",
      label: "Product Details",
      type: "textarea",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({label, value}) => ({label, value})),
      required: true,
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      label: "Product Images",
      type: "array",
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: "image",
        plural: "images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
      required: true,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      access: {
        create: ({req}) => req.user.role === "admin",
        read: ({req}) => req.user.role === "admin",
        update: ({req}) => req.user.role === "admin",
      },
      type: "select",
      defaultValue: "pending",
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
      required: true,
    },
    {
      name: "product_files",
      label: "Product File(s)",
      type: "relationship",
      relationTo: "product_files",
      hasMany: false,
      required: true,
    },
  ],
}