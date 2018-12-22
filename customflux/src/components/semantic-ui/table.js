/**
 <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>January 11, 2014</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill Lewis</Table.Cell>
        <Table.Cell>May 11, 2014</Table.Cell>
        <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
 */
componentregistry.registerComponent("grid", {
    render: function (contextObject, mainFrag, childFrag) {
       
       // contextObject.headerRows
/*
       let headerCells=[];
       headerCells.push(React.createElement(semanticUIReact.Table.HeaderCell, null, "Name"));

        let headerRow = React.createElement(semanticUIReact.Table.Row, null,headerCells);
        let header = React.createElement(semanticUIReact.Table.Header, null,headerRow);

        let cells = [];

        cells.push(React.createElement(semanticUIReact.Table.Cell, null, "John Lilki"));


        let rows = [];

        rows.push(React.createElement(semanticUIReact.Table.Row, null,cells));

        let tBody =  React.createElement(semanticUIReact.Table.Body, null,rows);
*/
        let table = React.createElement(semanticUIReact.Table, null, childFrag);

        return table;
    }
});

componentregistry.registerComponent("grid-body", {
    render: function (contextObject, mainFrag, childFrag) {
        let tBody =  React.createElement(semanticUIReact.Table.Body, null,childFrag);
        return tBody;
    }
});

componentregistry.registerComponent("grid-row", {
    render: function (contextObject, mainFrag, childFrag) {
        let row =  React.createElement(semanticUIReact.Table.Row, null, childFrag);
        return row;
    }
});

componentregistry.registerComponent("grid-cell", {
    render: function (contextObject, mainFrag, childFrag) {
        let data;
        let cell =  React.createElement(semanticUIReact.Table.Cell, null, childFrag);
        return cell;
    }
});

componentregistry.registerComponent("grid-header", {
    render: function (contextObject, mainFrag, childFrag) {
        let data;
        let header =  React.createElement(semanticUIReact.Table.Header, null, childFrag);
        return header;
    }
});

componentregistry.registerComponent("grid-header-cell", {
    render: function (contextObject, mainFrag, childFrag) {
        let data;
        let headerCell =  React.createElement(semanticUIReact.Table.HeaderCell, null, childFrag);
        return headerCell;
    }
});


