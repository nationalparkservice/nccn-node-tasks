var data = require('./data.json');
var fs = require('fs');
var output = [];

data.forEach(function (row, index, array) {
  if (row['Other Codes Included'] !== '-') {
    var otherTaxonCodes;
    otherTaxonCodes = row['Other Codes Included'].split(',');

    otherTaxonCodes.forEach(function (otherTaxonCode) {
      var inList;

      inList = array.some(function (taxonCode) {
        return otherTaxonCode.trim() === taxonCode.Code;
      });

      if (inList === false) {
        var outputRow;
        outputRow = {};

        outputRow.Code = otherTaxonCode.trim();
        outputRow.Parent = row.Code;
        output.push(outputRow);
        console.log(outputRow);
      }
    });
  }
});

fs.writeFileSync('./results.json', JSON.stringify(output));
