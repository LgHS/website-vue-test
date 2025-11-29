<script setup>
import { InputText } from 'primevue';

let value = "";
</script>

<template>
  <article class="mb-6">
    <InputText type="text" v-model="value" />
    <h3 class="bg-black text-white uppercase font-bold px-4 py-3 text-base mb-4">
      Le Liège Hackerspace
    </h3>
    <div class="leading-relaxed">
      <p>
        Situé sur l'île de la République libre d'Outremeuse à Liège, le <strong>Liège Hackerspace</strong> <em>(LgHs en
          abrégé)</em> est un tiers-lieu d'inclusion sociale et technologique où des personnes partageant un intérêt
        commun peuvent se rencontrer, collaborer, coopérer et mutualiser leurs ressources ainsi que leurs connaissances.
      </p>
      <p>
        Les hackerspaces peuvent être vus comme des laboratoires communautaires ouverts où des gens peuvent partager des
        ressources, savoirs,...
      </p>
      <h4>Des pirates ?</h4>
      <p>
        Le terme “hacker”, galvaudé en français, ne se réfère pas ici au “pirate”. Il désigne plutôt un bidouilleur, une
        personne curieuse <em>débutante comme experte</em> qui souhaite apprendre, partager le savoir et le
        savoir-faire, se poser des questions et créer de nouvelles choses.</p>
      <h4>Pas de service</h4>
      <p>
        Enfin pas directement... Dans un hackerspace, il n'y a pas de clients ni vraiment de services « prêts à
        consommer ». C'est un lieu participatif où chacun apprend, expérimente et contribue à sa manière. Nous sommes
        évidemment ouverts à des collaborations avec des artistes, des collectifs...
      </p>
      <p>
        Les hackerspaces sont à différencier des FabLabs devenus un terme fourre-tout, utilisé pour désigner aussi bien
        des FabLabs, MakerSpaces, TechShops, HackerSpaces,... <a
          href="https://web.archive.org/web/20220122011958/https://fr.flossmanuals.net/fablab-hackerspace-les-lieux-de-fabrication-numerique-collaboratif/introduction/"
          title="FossManual Archive" target="_blank" rel="noopener">Flossmanuals</a> résume très bien les différences
        entre ces lieux.
      </p>
      <h4>Lieu indépendant</h4>
      <p>
        Le financement provient majoritairement des membres et de nos différentes activités (projets, workshops, ...),
        ainsi que de quelques super sponsors privés qui garantissent notre autonomie et notre indépendance, et de rares
        aides publiques, mineures.
      </p>
    </div>
  </article>
</template>