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
      let fileNames = await fsReaddir(state.mainFolder);
      return dispatch('prepareFiles', fileNames);
    },
    prepareFiles: async function({ commit, state }, fileNames) {
      let fileList = [];
      let mp3FileNames = fileNames.filter(fileName => fileName.endsWith('.mp3'));
      commit('clearFilesToEdit');
      for(const mp3FileName of mp3FileNames) {
        let mp3FilePath = path.join(state.mainFolder, mp3FileName);
        let tags = await nodeID3Read(mp3FilePath);
        let fileObj = {
          name: mp3FileName,
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
    },
    processFilesToEdit: function({ commit, state }, tags) {
      let doneWithoutErrors = true;
      for(const fileToEdit of state.filesToEdit) {
        if(!NodeID3.update(tags, fileToEdit.path)) {
          doneWithoutErrors = false;
        }
      }
      commit('clearFilesToEdit');
      return doneWithoutErrors;
    }
  }
})
