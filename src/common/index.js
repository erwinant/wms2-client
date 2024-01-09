const silence = (form_obj = {}, set_on = true, except = []) => {
    if (set_on)
        form_obj = form_obj.map((m) => {
            m.disabled = true;
            return m;
        });
    else
        form_obj =
            except.length == 0
                ? form_obj.map((m) => {
                      delete m.disabled;
                      return m;
                  })
                : form_obj
                      .map((m) => {
                          delete m.disabled;
                          return m;
                      })
                      .map((m) => {
                          if (except.includes(m.name)) m.disabled = true;
                          return m;
                      });
    return form_obj;
};

export { silence };
