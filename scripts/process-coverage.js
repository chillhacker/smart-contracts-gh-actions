const fs = require("fs");
const path = "./coverage/coverage-final.json";

if (!fs.existsSync(path)) {
  console.log("Coverage summary not available.");
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(path, "utf8"));
let totalStatements = 0,
  coveredStatements = 0;
let totalBranches = 0,
  coveredBranches = 0;
let totalFunctions = 0,
  coveredFunctions = 0;
let totalLines = 0,
  coveredLines = 0;

Object.values(data).forEach((contract) => {
  // Statements
  totalStatements += Object.keys(contract.s).length;
  coveredStatements += Object.values(contract.s).filter((count) => count > 0).length;

  // Branches
  totalBranches += Object.values(contract.b).reduce((sum, branches) => sum + branches.length, 0);
  coveredBranches += Object.values(contract.b).reduce((sum, branches) => sum + branches.filter((count) => count > 0).length, 0);

  // Functions
  totalFunctions += Object.keys(contract.f).length;
  coveredFunctions += Object.values(contract.f).filter((count) => count > 0).length;

  // Lines
  totalLines += Object.keys(contract.l).length;
  coveredLines += Object.values(contract.l).filter((count) => count > 0).length;
});

const statementCoverage = ((coveredStatements / totalStatements) * 100).toFixed(2);
const branchCoverage = ((coveredBranches / totalBranches) * 100).toFixed(2);
const functionCoverage = ((coveredFunctions / totalFunctions) * 100).toFixed(2);
const lineCoverage = ((coveredLines / totalLines) * 100).toFixed(2);

console.log("Coverage Summary:");
console.log("Statements:", `${statementCoverage}% (${coveredStatements}/${totalStatements})`);
console.log("Branches:", `${branchCoverage}% (${coveredBranches}/${totalBranches})`);
console.log("Functions:", `${functionCoverage}% (${coveredFunctions}/${totalFunctions})`);
console.log("Lines:", `${lineCoverage}% (${coveredLines}/${totalLines})`);
