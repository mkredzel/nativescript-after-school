<template lang="html">
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label text="MENU" @tap="" col="0"/>
        <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
      </GridLayout>
    </ActionBar>

    <GridLayout columns="*" rows="*">
      <Label class="message" :text="text" col="0" row="0"/>
    </GridLayout>
  </Page>
</template>

<script>

</script>

<style lang="css">
</style>