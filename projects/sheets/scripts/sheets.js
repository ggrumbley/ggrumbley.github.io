(function(window) {
  'use strict';

  var Sheets = React.createClass({
    displayName: 'Sheets',
    propTypes: {
      headers: React.PropTypes.arrayOf(
        React.PropTypes.string
      ),
      initialData: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(
          React.PropTypes.string
        )
      ),
    },
    _log: [],
    _logSetState: function (newState) {
      this._log.push(JSON.parse(JSON.stringify(
        this._log.length === 0 ? this.state : newState
      )));
      this.setState(newState);
    },
    _replay: function () {
      if (this._log.length === 0) {
        console.warn('No state to replay yet');
        return;
      }
      var idx = -1;
      var interval = setInterval(function () {
        idx++;
        if (idx === this._log.length - 1) {
          clearInterval(interval);
        }
        this.setState(this._log[idx]);
      }.bind(this), 1000);
    },
    _undo: function () {
      console.log('UNDO!');
      this._log.pop();
      this.setState(this._log[this._log.length - 1]);
    },
    componentDidMount: function() {
       document.onkeydown = function(e) {
         if (e.altKey && e.shiftKey && e.keyCode === 82) {
           this._replay();
         } else if (e.ctrlKey && e.keyCode === 90) {
           this._undo();
         } else if (e.ctrlKey && e.keyCode === 89) {
           console.log('REDO!');
         }
       }.bind(this);
     },
    getInitialState: function () {
      return {
        data: this.props.initialData,
        sortby: null,
        descending: false,
        edit: null,
        search: false,
      };
    },
    _sort: function (e) {
      var column = e.target.cellIndex;
      var data = this.state.data.slice();
      var descending = this.state.sortby === column && !this.state.descending;
      data.sort(function (a, b) {
        return descending
          ? (a[column] < b[column] ? 1 : -1)
          : (a[column] > b[column] ? 1 : -1);
      });
      this._logSetState({
        data: data,
        sortby: column,
        descending: descending,
      });
    },

    _showEditor: function (e) {
      this._logSetState({edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }});
    },
    _save: function (e) {
      e.preventDefault();
      var input = e.target.firstChild;
      var data = this.state.data.slice();
      data[this.state.edit.row][this.state.edit.cell] = input.value;
      this._logSetState({
        edit: null,
        data: data,
      });
    },

    _preSearchData: null,

    _toggleSearch: function () {
      if (this.state.search) {
        this._logSetState({
          data: this._preSearchData,
          search: false,
        });
        this._preSearchData = null;
      } else {
        this._preSearchData = this.state.data;
        this._logSetState({
          search: true,
        });
      }
    },

    _search: function (e) {
      var needle = e.target.value.toLowerCase();
      if (!needle) {
        this._logSetState({data: this._preSearchData});
        return;
      }
      var idx = e.target.dataset.idx;
      var searchdata = this._preSearchData.filter(function (row) {
        return row[idx].toString().toLowerCase().indexOf(needle) > -1;
      });
      this._logSetState({data: searchdata});
    },
    _download: function(format, ev) {
       var contents = format === 'json'
         ? JSON.stringify(this.state.data)
         : this.state.data.reduce(function(result, row) {
             return result
               + row.reduce(function(rowresult, cell, idx) {
                   return rowresult
                     + '"'
                     + cell.replace(/"/g, '""')
                     + '"'
                     + (idx < row.length - 1 ? ',' : '');
                 }, '')
               + "\n";
           }, '');
       var URL = window.URL || window.webkitURL;
       var blob = new Blob([contents], {type: 'text/' + format});
       ev.target.href = URL.createObjectURL(blob);
       ev.target.download = 'data.' + format;
     },

    _renderToolbar: function () {
      var btnStyle = {
        margin: '15px'
      };
      return React.DOM.div(null,
        React.DOM.button({
          onClick: this._toggleSearch,
          className: 'pure-button pure-button-primary',
          style: btnStyle
        }, 'Search'),
        React.DOM.a({
          onClick: this._download.bind(this, 'json'),
          href: 'data.json',
          className: 'pure-button pure-button-primary',
          style: btnStyle
        }, 'Export JSON'),
        React.DOM.a({
          onClick: this._download.bind(this, 'csv'),
          href: 'data.csv',
          className: 'pure-button pure-button-primary',
          style: btnStyle
        }, 'Export CSV')
      );
    },
    _renderSearch: function () {
      if (!this.state.search) {
        return null;
      }
      return (
        React.DOM.tr({onChange: this._search},
          this.props.headers.map(function (_ignore, idx) {
            return React.DOM.td({key: idx},
              React.DOM.input({
                type: 'text',
                'data-idx': idx,
              })
            );
          })
        )
      );
    },

    _renderTable: function () {
      return (
        React.DOM.table({className: 'pure-table pure-table-bordered'},
          React.DOM.thead({onClick: this._sort},
            React.DOM.tr(null,
              this.props.headers.map(function (title, idx) {
                if (this.state.sortby === idx) {
                  title += this.state.descending ? ' \u2191' : ' \u2193'
                }
                return React.DOM.th({key: idx}, title);
              }, this)
            )
          ),
          React.DOM.tbody({onDoubleClick: this._showEditor},
            this._renderSearch(),
            this.state.data.map(function (row, rowidx) {
              return (
                React.DOM.tr({key: rowidx},
                  row.map(function (cell, idx) {
                    var content = cell;
                    var edit = this.state.edit;
                    if (edit && edit.row === rowidx && edit.cell === idx) {
                      content = React.DOM.form({onSubmit: this._save},
                        React.DOM.input({
                          type: 'text',
                          defaultValue: cell,
                        })
                      );
                    }
                    return React.DOM.td({
                      key: idx,
                      'data-row': rowidx
                    }, content);
                  }, this)
                )
              );
            }, this)
          )
        )
      );
    },

    render: function () {
      return (
        React.DOM.div(null,
          this._renderToolbar(),
          this._renderTable()
        )
      );
    },

  });

  ReactDOM.render(
    React.createElement(Sheets, {
      headers: headers,
      initialData: data,
    }),
    document.getElementById('app')
  );

})(window);
