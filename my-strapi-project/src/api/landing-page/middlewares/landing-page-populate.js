'use strict';

/**
 * `landing-page-populate` middleware
 */

const populate = {
  metadata: {
    populate: {
      metaImage: {
        populate: true,
        fields: ["name", "alternativeText", "url"]
      }
    }
  },
  blocks: {
    populate: {
      link: {
        populate: true,
      },
      image: {
        fields: ["name", "alternativeText", "url"],
      },
      card: {
        populate: {
          image: {
            fields: ["name", "alternativeText", "url"],
          }
        }
      },
      plan: {
        populate: ["services", "link"],
      },
      form: {
        populate: ["input", "button"]
      },
    }
  },
};

module.exports = (config, {strapi}) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In landing-page-populate middleware.');
    // passing the populate object to the query controller and return data
    // the frontend can easily access the sample api url
    // we need to add this  to route
    ctx.query = {
      populate,
      ...ctx.query,
    };
    await next();
  };
};
