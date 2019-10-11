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
    files: [],
    filesToEdit: [],
  },
  mutations: {
    setMainFolder: function(state, mainFolder) {
      state.mainFolder = mainFolder;
    },
    setFiles: function(state, files) {
      state.files = files;
    },
    clearFilesToEdit: function(state) {
      state.filesToEdit = [];
    },
    addFileToEdit: function(state, file) {
      state.filesToEdit.push(file);
    },
    removeFileToEdit: function(state, file) {
      let elementIndex = state.filesToEdit.indexOf(file);
      if(elementIndex >= 0) {
        state.filesToEdit.splice(elementIndex, 1);
      }
    }
  },
  getters: {
    isFileToEdit: (state) => (file) => {
      return state.filesToEdit.find(fileToEdit => fileToEdit.name == file.name) != undefined;
    }
  },
  actions: {
    reset: function({ commit }) {
      commit('setMainFolder', null);
      commit('setFiles', []);
      commit('clearFilesToEdit');
    },
    chooseMainFolder: async function({ commit, state, dispatch }, mainFolder) {
      await dispatch('reset');
      commit('setMainFolder', mainFolder);
      let files = await fsReaddir(state.mainFolder);
      return dispatch('prepareFiles', files);
    },
    prepareFiles: async function({ commit, state }, files) {
      let fileList = [];
      let mp3Files = files.filter(file => file.endsWith('.mp3'));
      commit('clearFilesToEdit');
      for(const mp3File of mp3Files) {
        let mp3FilePath = path.join(state.mainFolder, mp3File);
        let tags = await nodeID3Read(mp3FilePath);
        let fileObj = {
          name: mp3File,
          path: mp3FilePath,
          artist: tags['artist'],
          album: tags['album'],
        };
        fileList.push(fileObj);
        if(fileObj.artist == null || fileObj.album == null) {
          commit('addFileToEdit', fileObj);
        }
      }
      commit('setFiles', fileList);
    },
    toggleFileToEdit: function({ getters, commit }, file) {
      if(getters.isFileToEdit(file)) {
        commit('removeFileToEdit', file);
      } else {
        commit('addFileToEdit', file);
      }
    }
  }
})
