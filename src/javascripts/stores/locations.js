module.exports = (contentful, dispatcher) => {

  let actions = new Map();

  actions.set(/\/$/, () => {
    setTimeout(() => {
      dispatcher.dispatch({
        actionType: 'received-initial-data',
        initialData: null
      });
    }, 0);
  });

  actions.set(/list$/, () => {
    contentful.entries().then(entries => {
      dispatcher.dispatch({
        actionType: 'received-initial-data',
        initialData: entries
      });
    });
  });

  dispatcher.register(payload => {
    if(payload.actionType === 'get-initial-data'){
      // Kind of pattern matching
      actions.forEach((action, re) => {
        if(re.test(payload.path)){
          action();
        }
      });
    }

    if(payload.actionType === 'get-entries'){
      contentful.entries().then(entries => {
        dispatcher.dispatch({
          actionType: 'received-entries',
          entries: entries
        });
      });
    }

  });

};
