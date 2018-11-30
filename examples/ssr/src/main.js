import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createInstantSearch } from './instantsearch';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

Vue.config.productionTip = false;

export async function createApp({
  beforeApp = () => {},
  afterApp = () => {},
} = {}) {
  const router = createRouter();

  const instantsearch = createInstantSearch({
    searchClient,
    indexName: 'movies',
    // options: {
    //   stalledSearchDelay: 50
    // }
  });

  await beforeApp({
    router,
    instantsearch,
  });

  const app = new Vue({
    router,
    render: h => h(App),
    ...instantsearch.injectToRootOrProvideOrSomethingMaybeAMixin(),
  });

  const result = {
    app,
    router,
    instantsearch,
  };

  await afterApp(result);

  return result;
}
