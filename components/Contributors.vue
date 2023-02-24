<template>
  <div style="text-align: center" class="background">
    <h1 style="font-size: 70px">
      Contributors
    </h1>
    <div>
      <div
        v-for="contributor of contributors"
        :key="contributor.name"
        class="contributor"
      >
        <a class="contributor-link" :href="contributor.github">{{
          contributor.name
        }}</a>
        <p>{{ contributor.description }}</p>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contributors: [
        {
          name: 'TitaniumNetwork',
          description: 'A group dedicated to ending censorship',
          github: 'https://github.com/titaniumnetwork-dev'
        },
        {
          name: 'B3ATDROP3R',
          description: 'Original creator of this website',
          github: 'https://github.com/B3ATDROP3R'
        },
        {
          name: 'Sexyduceduce',
          description: 'Creator of Alloy and Corrosion web proxies',
          github: 'https://github.com/caracal-js'
        }
      ]
    }
  }
}
</script>

<style>
.contributor-link {
  font-size: 20px;
  font-weight: bold;
  padding: none;
  color: var(--icon-color);
  text-decoration: none;
}

.contributor-link:hover {
  color: var(--active-color);
  text-decoration: underline;
}
</style>
