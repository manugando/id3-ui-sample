import Vue from 'vue'
import Vuex from 'vuex'

const util = window.require('util');
const fs = window.require('fs');
const path = window.require('path');
const NodeID3 = window.require('node-id3');
const fsReaddir = util.promisify(fs.readdir);
const nodeID3Read = util.promisify(NodeID3.read.bind(NodeID3));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainFolder: null,
    files: []
  },
  mutations: {
    setMainFolder(state, mainFolder) {
      state.mainFolder = mainFolder;
    },
    setFiles(state, files) {
      state.files = files;
    }
  },
  actions: {
    chooseMainFolder({ commit, state, dispatch }, mainFolder) {
      commit('setMainFolder', mainFolder);
      return fsReaddir(state.mainFolder).then((files) => {
        dispatch('prepareFiles', files);
      });
    },
    prepareFiles({ commit, state }, files) {
      let mp3Files = files.filter(file => file.endsWith('.mp3'));
      mp3Files.forEach(mp3File => {
        let mp3FilePath = path.join(state.mainFolder, mp3File);
        console.log(mp3FilePath);
        nodeID3Read(mp3FilePath).then((tags) => {
          console.log(tags);
        }).catch((error) => {
          console.error(error);
        });
      });
    }
  }
})
