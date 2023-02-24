<template>
  <div>
    <client-only>
      <vue-tabs-chrome ref="tabBar" v-model="tab" theme="custom" :tabs="tabs">
        <span slot="after" class="btn-add" @click="openTab()">+</span>
      </vue-tabs-chrome>
    </client-only>
    <div class="tab-bar-content">
      <Arrow class="interaction-button" @click="navigate(-1)" />
      <Arrow
        style="transform: rotate(180deg)"
        class="interaction-button"
        @click="navigate(1)"
      />
      <Reload class="interaction-button" @click="reload()" />
      <input
        v-model="input"
        class="input-url"
        type="url"
        placeholder="Search Google or type a URL"
        @keydown.enter="search()"
      />
      <Dots
        style="margin-right: 8px; margin-top: 1.5px"
        class="interaction-button"
        @click="test()"
      />
    </div>
    <div v-for="tabbed of tabs" :key="tabbed.key">
      <iframe
        v-if="tabbed.url.startsWith('http')"
        v-show="currentTab.key === tabbed.key"
        :ref="tabbed.key"
        class="content"
        allow="fullscreen"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-pointer-lock"
        :src="`/fetch/${tabbed.url}`"
        @load="update()"
      />
      <Games
        v-else-if="tabbed.url === '/games'"
        v-show="currentTab.key === tabbed.key"
      />
      <Contributors
        v-else-if="tabbed.url === '/contributors'"
        v-show="currentTab.key === tabbed.key"
      />
      <Home
        v-else
        v-show="currentTab.key === tabbed.key"
        @link-clicked="search($event)"
      />
    </div>
  </div>
</template>

<script>
import Arrow from "~/assets/svg/arrow.svg?inline";
import Reload from "~/assets/svg/reload.svg?inline";
import Dots from "~/assets/svg/dots.svg?inline";

class Tab {
  constructor({ label, key, index, history }) {
    this.label = label;
    this.key = key;
    this.index = index;
    this.history = history;
  }

  get url() {
    return this.history[this.index];
  }

  set url(value) {
    this.history.push(value);
    this.index += 1;
  }
}

const tabTitles = {
  "/games": "New GameTab",
  "/contributors": "Hypertabs Contributors",
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default {
  components: {
    Arrow,
    Reload,
    Dots,
  },
  data() {
    return {
      tab: "default",
      input: "",
      tabs: [
        new Tab({
          label: "New Tab",
          key: "default",
          index: 0,
          history: ["/default"],
        }),
      ],
    };
  },
  computed: {
    currentTab() {
      return this.tabs.find((t) => t.key === this.tab);
    },
    currentUrl() {
      return this.currentTab.url.startsWith("/")
        ? ""
        : this.currentTab.url.split("://").pop();
    },
    currentIframe() {
      return this.$refs[this.tab][0];
    },
  },
  watch: {
    tab() {
      this.input = this.currentUrl;
    },
  },
  methods: {
    openTab() {
      const tab = new Tab({
        label: "New Tab",
        key: Date.now(),
        index: 0,
        tabHistory: ["/default"],
      });

      this.$refs.tabBar.addTab(tab);
      this.tab = tab.key;
    },
    search(input) {
      if (input) {
        this.currentTab.url = input;
        if (input.startsWith("/")) {
          this.currentTab.label = tabTitles[input];
        }
      } else if (this.input.trim().includes(" ")) {
        this.currentTab.url = `https://google.com/search?q=${encodeURIComponent(
          this.input
        )}`;
      } else if (this.input.startsWith("http")) {
        this.currentTab.url = this.input;
      } else {
        this.currentTab.url = `https://${this.input}`;
      }

      this.input = this.currentUrl;
    },
    update() {
      this.currentTab.label =
        this.currentIframe.contentWindow.document.title ||
        capitalize(this.currentUrl.split(".")[0]);

      this.currentTab.favicon =
        this.currentIframe.contentWindow.document.querySelector(
          "link[rel='icon']"
        )?.href;
    },
    reload() {
      this.currentUrl.length
        ? this.currentIframe.contentWindow.location.reload()
        : null;
    },
    navigate(pos) {
      this.currentTab.index += pos;
    },
    test() {
      console.log(this.currentTab.history);
    }
  },
};
</script>

<style>
.vue-tabs-chrome.theme-custom {
  background-color: var(--background-color);
}

.vue-tabs-chrome .tabs-item.active .tabs-background-content,
.vue-tabs-chrome .tabs-footer {
  background-color: var(--active-color);
}

.vue-tabs-chrome .tabs-item.active .tabs-background-after,
.vue-tabs-chrome .tabs-item.active .tabs-background-before {
  fill: var(--active-color);
}

.vue-tabs-chrome .tabs-close-icon {
  stroke: var(--icon-color);
}

.content {
  display: flex;
  border: none;
  height: 100vh;
  width: 100vw;
}

.tab-bar-content {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  vertical-align: middle;
  padding: 0.5em;
  background-color: var(--active-color);
  fill: var(--icon-color);
}

.input-url {
  display: inline-flex;
  width: 100%;
  height: 26px;
  border-radius: 12px;
  border: none;
  outline: none;
  padding-left: 10px;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.interaction-button {
  padding: 3px;
  cursor: pointer;
}

.btn-add {
  color: var(--icon-color);
  font-weight: lighter;
  font-size: 28px;
  user-select: none;
  cursor: pointer;
  margin-left: 0.1em;
  margin-bottom: 0.1em;
}
</style>
