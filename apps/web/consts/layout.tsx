import {
  Box,
  Inbox,
  LayoutGrid,
  Package,
  Tag
} from "lucide-react"

export const LAYOUT_OPTIONS = [
  {
    label: '',
    menus: [
      {
        id: "dashboard",
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutGrid,
      },
      {
        id: "product",
        title: "Product",
        icon: Box,
        items: [
          {
            id: "product",
            title: "Product",
            url: "/product",
            icon: Package,
          },
          {
            id: "product-tag",
            title: "Product Tag",
            url: "/product-tag",
            icon: Tag,
          },
          // {
          //   id: "product-category",
          //   title: "Product Category",
          //   url: "/product-category",
          //   icon: Layers,
          // },
        ]
      },
      {
        id: "post",
        title: "Post",
        url: "/post",
        icon: Inbox,
      },
      // {
      //   id: "blog",
      //   title: "Blog",
      //   icon: Box,
      //   items: [
      //     {
      //       id: "blog",
      //       title: "Blog",
      //       url: "/blog",
      //       icon: Package,
      //     },
      //     {
      //       id: "blog-tag",
      //       title: "Blog Tag",
      //       url: "/blog-tag",
      //       icon: Tag,
      //     },
      //     // {
      //     //   id: "product-category",
      //     //   title: "Product Category",
      //     //   url: "/product-category",
      //     //   icon: Layers,
      //     // },
      //   ]
      // },
    ]
  }
]