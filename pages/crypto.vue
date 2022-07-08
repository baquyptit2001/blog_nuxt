<template>
  <div>
    <input v-model="normal" v-on:change="encrypted"/>
    <div>
      <span>
        Normal: {{ normal }}
      </span>
    </div>
    <div>
      <span>
        Encrypted: {{ enc }}
      </span>
    </div>
    <div>
      <span>
        Decrypted: {{ dec }}
      </span>
    </div>
  </div>
</template>

<script>
import {CRYPTO_KEY} from "@/common/constants";


export default {
  name: "crypto",
  data() {
    return {
      AES: null,
      normal: null,
      dec: '',
      enc: '',
      key: '',
      crypto: null
    };
  },
  mounted() {
    this.crypto = require('crypto-js');
    this.AES = this.crypto.AES;
    this.key = 'avc';
  },
  methods: {
    encrypted() {
      this.enc = this.crypto.AES.encrypt(this.normal.toString()).toString()
    }
  }
}
</script>

<style scoped>

</style>
