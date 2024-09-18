import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES } from "../../config/index";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-types";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({req, data}) => {
  const user = req.user

  return {...data, user: user.id}
}

// so named because I thought VS code was acting when I was the one who was a funny error
//@ts-ignore: shut up, TypeScript
const myBad = async (args) => {
  if(args.operation === "create") {
    const data = args.data as Product

    const createdProduct = await stripe.products.create({
      name: data.name,
      default_price_data: {
        currency: "USD",
        unit_amount: Math.round(data.price * 100)
      }
    })
    const created: Product = {
      ...data,
      stripeId: createdProduct.id,
      priceId: createdProduct.default_price as string,
    }
    return created
  }
  else if(args.operation === "update") {
    const data = args.data as Product

    const updatedProduct = await stripe.products.update(data.stripeId!, {
      name: data.name,
      default_price: data.stripeId!
    })
    const updated: Product = {
      ...data,
      stripeId: updatedProduct.id,
      priceId: updatedProduct.default_price as string,
    }
    return updated
  }
}
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  hooks: {
    beforeChange: [
      addUser,
      myBad,
    ],
  },
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