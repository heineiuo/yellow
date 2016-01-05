
/**
 * 内建JS数据库 & ODM
 */

(function(global){

  var __db = {}

  function factory(){

    return function (modelName, schema) {

      if (typeof __db[modelName] == 'undefined') {

        if (typeof schema != 'undefined') {
          __db[modelName] = {
            data: {},
            schema: schema
          }
        } else {
          return false
        }

      }

      var _modelName = modelName

      return {

        on: function(){


        },

        drop: function () {
          delete __db[_modelName]
        },

        clone: function (anotherModelName) {
          if (typeof __db[anotherModelName] != 'undefined') {
            __db[_modelName].data = __db[anotherModelName].data
            __db[_modelName].schema = __db[anotherModelName].schema

          };
        },

        find: function (json) {

          var result = []
          var resultKey = []

          for (var jsonkey in json) {
            var findKey = jsonkey
            var findVal = json[jsonkey]

            for (var _pid in __db[modelName].data) {
              if (__db[modelName].data[_pid][findKey] == findVal && !inArray(_pid, resultKey)) {
                result.push(__db[modelName].data[_pid])
                resultKey.push(_pid)
              }
            }

          }

          return result
        },

        findOne: function (json) {

          var result = []
          var findKey = ''
          var findVal = ''

          for (var jsonkey in json) {
            findKey = jsonkey
            findVal = json[jsonkey]
            break
          }

          for (var _pid in __db[modelName].data) {
            if (__db[modelName].data[_pid][findKey] == findVal) {
              result.push(__db[modelName].data[_pid])
              break
            }
          }

          return result
        },

        create: function(json){

          var _pid = hex_md5('postshare'+Date.now()+Math.random())
          __db[modelName].data[_pid] = {
            '_pid': _pid
          }
          for (jsonkey in json) {
            __db[modelName].data[_pid][jsonkey] = json[jsonkey]
          }

        },

        update: function (json) {

          if (typeof json['_pid'] != 'undefined' && typeof __db[modelName].data[json._pid] != 'undefined') {
            __db[modelName].data[json._pid] = json
          }
        },

        delete: function (json) {

          // delete __db[modelName][json['_pid']]

          var findKey = ''
          var findVal = ''

          for (var jsonkey in json) {
            findKey = jsonkey
            findVal = json[jsonkey]
            break
          }

          for (var _pid in __db[modelName].data) {
            if (__db[modelName].data[_pid][findKey] == findVal) {
              delete __db[modelName].data[_pid]
            }
          }
        }
      }

    }

  }


  global.rubine = factory()

})(this)


