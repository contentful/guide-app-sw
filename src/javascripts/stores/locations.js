module.exports = (contentful, dispatcher) => {

  let actions = new Map();

  actions.set(/list/, () => {
    contentful.entries().then(entries => {
      dispatcher.dispatch({
        actionType: 'set-initial-data',
        initialData: entries
      });
    });
  });

  dispatcher.register(payload => {
    if(payload.actionType === 'get-initial-data'){
      // Kind of pattern matching
      actions.forEach((action, re) => {
        if(re.test(payload.path)) action();
      });
    }
  });

};
