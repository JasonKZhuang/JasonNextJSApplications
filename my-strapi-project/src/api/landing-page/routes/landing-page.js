'use strict';

/**
 * landing-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::landing-page.landing-page',{
  config: {
    // Add your own logic here.
    find:{
      // using strapi command console to list middlewares name,
      // yarn strapi console
      // strapi
      // strapi.middlewares
      middlewares:["api::landing-page.landing-page-populate"],
    },
    findOne:{
      middlewares:["api::landing-page.landing-page-populate"],
    },
  },
});
