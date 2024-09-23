import squareClient from "../utils/square-client.js";
import jsonBigInt from "json-bigint";
import asyncHandler from "express-async-handler";

const get_services = asyncHandler(async (req, res, next) => {
  const type = req.params.type;
  const cancel = req.query.cancel;

  try {
    let items = await getCatalogItems(type);

    const discountRes = await squareClient.catalogApi.searchCatalogObjects({
      objectTypes: ["DISCOUNT"],
    });

    const discounts = discountRes.result.objects;

    res.json({
      items: jsonBigInt.stringify(items),
      discounts: jsonBigInt.stringify(discounts),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

async function getCatalogItems(type) {
  let catalogItems;

  const catRes = await squareClient.catalogApi.searchCatalogObjects({
    objectTypes: ["CATEGORY"],
  });

  const categories = catRes.result.objects;

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].categoryData.name.localeCompare(type) == 0) {
      catalogItems = await getCategoryItems(categories[i].id);
    }
  }

  if (!catalogItems) {
    catalogItems = [];
  }

  return catalogItems;
}

async function getCategoryItems(id) {
  const response = await squareClient.catalogApi.searchCatalogObjects({
    objectTypes: ["ITEM"],
    query: {
      setQuery: {
        attributeName: "categories",
        attributeValues: [id],
      },
    },
  });

  return response.result.objects;
}

export default {
  get_services,
};
