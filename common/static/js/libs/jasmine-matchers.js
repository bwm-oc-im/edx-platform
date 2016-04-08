beforeEach(function () {
  jasmine.addMatchers({
      toEventHandle: function () {
          return {
            compare: function (actual, event) {
              if ( !actual || actual.length === 0 ) return { pass: false };
              var events = $._data($(actual).get(0), "events")

              if (!events || !event || typeof event !== "string") {
                return { pass: false }
              }

              var namespaces = event.split(".")
                , eventType = namespaces.shift()
                , sortedNamespaces = namespaces.slice(0).sort()
                , namespaceRegExp = new RegExp("(^|\\.)" + sortedNamespaces.join("\\.(?:.*\\.)?") + "(\\.|$)")

              if (events[eventType] && namespaces.length) {
                for (var i = 0; i < events[eventType].length; i++) {
                  var namespace = events[eventType][i].namespace

                  if (namespaceRegExp.test(namespace))
                    return { pass: true }
                }
              } else {
                return { pass: (events[eventType] && events[eventType].length > 0) }
              }

              return { pass: false }
            }
          }
        },

        toEventHandleWith: function () {
          return {
            compare: function (actual, eventName, eventHandler) {
              if ( !actual || actual.length === 0 ) return { pass: false };
              var normalizedEventName = eventName.split('.')[0]
                , stack = $._data($(actual).get(0), "events")[normalizedEventName]

              for (var i = 0; i < stack.length; i++) {
                if (stack[i].handler == eventHandler) return { pass: true }
              }

              return { pass: false }
            }
          }
        }
  })
})
