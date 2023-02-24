<template>
  <div class="background">
    <title>New Hypertab</title>
    <div class="widget">
      <h2>{{ location }}</h2>
      <h2>{{ weather }}</h2>
    </div>
    <div style="text-align: center">
      <h1 style="font-size: 70px">Hypertabs</h1>
      <p style="font-size: 14px; font: bold">
        TitaniumNetwork is an organization dedicated to <br />
        providing free access to information by bypassing the over-restrictive
        <br />
        filters employed by institutions like Schools and Workplaces. <br />
        Big updates coming soon.
      </p>
      <div class="links">
        <div
          v-for="link in links"
          :key="link.title"
          class="link-item"
          @click="$emit('link-clicked', link.url)"
        >
          <img class="link-icon" :src="link.icon" /> <br />
          <span>{{ link.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parse } from "node-html-parser";

export default {
  data() {
    return {
      location: "",
      weather: "",
      links: [
        {
          icon: "/games.png",
          title: "Games",
          url: "/games",
        },
        {
          icon: "/music.png",
          title: "Music",
          url: "https://music.youtube.com",
        },
        {
          icon: "/icon.png",
          title: "Contributors",
          url: "/contributors",
        },
        {
          icon: "/discord.png",
          title: "Join\nDiscord",
          url: "https://discord.gg/unblock",
        },
      ],
    };
  },
  async fetch() {
    try {
      const ip = this.$nuxt.context.req.headers["x-forwarded-for"]
        ?.split(", ")
        .pop();

      const ipApi = await this.$http.$get(`http://ip-api.com/json/${ip}`);
      const weatherApi = await this.$http.$get(
        `https://forecast.weather.gov/MapClick.php?lat=${ipApi.lat}&lon=${ipApi.lon}`
      );
      const weatherData = parse(weatherApi);

      this.location = `${ipApi.city}, ${ipApi.regionName}`;
      this.weather = `${
        weatherData.querySelector(".myforecast-current").textContent
      } | ${weatherData.querySelector(".myforecast-current-lrg").textContent}`;
    } catch {
      this.location = "Charlotte, North Carolina";
    }
  },
};
</script>

<style>
.widget {
  text-align: right;
  margin-right: 2em;
}

.link-icon {
  width: 48px;
  height: 48px;
}

.links {
  display: inline-flex;
  flex-direction: row;
  margin-right: 0.9em;
  padding-top: 40px;
  justify-content: center;
}

.link-item {
  margin-left: 1em;
  width: 112px;
  height: 48px;
  cursor: pointer;
}
</style>
