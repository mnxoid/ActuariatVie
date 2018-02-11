const seq = n => Array(n).fill(1).map((x, y) => x + y)
const sum = (x,y)=>x+y
// sum from i-th index up to the end:
// seq(data.length-x).map(i=>i+x-1).map(i=>data[i]).reduce((x,y)=>x+y)

const Formulas = [
  {
    cellFormula: "l_x", // 0
    args: ["x"],
    longFormula: ({x, table}) => {
      return `l_{${x}}=${table[x]}`
    },
    value: ({x, table}) => {
      return table[x]
    },
    differeApplicable: false,
  },
  {
    cellFormula: "d_x", // 1
    args: ["x"],
    longFormula: ({x, table}) => {
      return `d_{${x}}=l_{${x}}-l_{${x}}=${Formulas[0].value({x, table})-Formulas[0].value({x: x+1, table})}`
    },
    value: ({x, table}) => {
      return table[x]-table[x+1]
    },
    differeApplicable: false,
  },
  {
    cellFormula: "q_x", // 2
    args: ["x"],
    longFormula: ({x, table}) => {
      return `q_{${x}}={{l_{${x}}-l_{${x+1}}}\over{l_{${x}}}}=${Formulas[1].value({x, table})/Formulas[0].value({x, table})}`
    },
    value: ({x, table}) => {
      return Formulas[1].value({x, table})/Formulas[0].value({x, table})
    },
    differeApplicable: false,
  },
  {
    cellFormula: "p_x", // 3 
    args: ["x"],
    longFormula: ({x, table}) => {
      return `p_{${x}}=1-q_{${x}}=${1-Formulas[2].value({x, table})}`
    },
    value: ({x, table}) => {
      return 1-Formulas[2].value({x, table})
    },
    differeApplicable: false,
  },
  {
    cellFormula: "D_x", // 4 
    args: ["x"],
    longFormula: ({x, table}) => {
      return `D_{${x}}=p_{${x}}(1+${table.i})^{${-x}}=${Formulas[3].value({x, table})*Math.pow(1+table.i,-x)}`
    },
    value: ({x, table}) => {
      return Formulas[3].value({x, table})*Math.pow(1+table.i,-x)
    },
    differeApplicable: false,
  },
  {
    cellFormula: "N_x", // 5
    args: ["x"],
    longFormula: ({x, table}) => {
      return `N_{${x}}=\sum_{k=0}^{w-{${x}}}{D_{${x}+k}}=${seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[4].value({x: i, table})).reduce(sum)}`
    },
    value: ({x, table}) => {
      return seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[4].value({x: i, table})).reduce(sum)
    },
    differeApplicable: true,
  },
  {
    cellFormula: "S_x", // 6
    args: ["x"],
    longFormula: ({x, table}) => {
      return `S_{${x}}=\sum_{k=0}^{w-{${x}}}{N_{${x}+k}}=${seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[5].value({x: i, table})).reduce(sum)}`
    },
    value: ({x, table}) => {
      return seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[5].value({x: i, table})).reduce(sum)
    },
    differeApplicable: false,
  },
  {
    cellFormula: "C_x", // 7
    args: ["x"],
    longFormula: ({x, table}) => {
      return `C_{${x}}=d_{${x}}(1+${table.i})^{-(${x}+{1\over2})}=${Formulas[1].value({x, table})*Math.pow(1+table.i,-(x+0.5))}`
    },
    value: ({x, table}) => {
      return Formulas[1].value({x, table})*Math.pow(1+table.i,-(x+0.5))
    },
    differeApplicable: false,
  },
  {
    cellFormula: "M_x", // 8
    args: ["x"],
    longFormula: ({x, table}) => {
      return `M_{${x}}=\sum_{k=0}^{w-{${x}}}{C_{${x}+k}}=${seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[7].value({x: i, table})).reduce(sum)}`
    },
    value: ({x, table}) => {
      return seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[7].value({x: i, table})).reduce(sum)
    },
    differeApplicable: true,
  },
  {
    cellFormula: "R_x", // 9
    args: ["x"],
    longFormula: ({x, table}) => {
      return `R_{${x}}=\sum_{k=0}^{w-{${x}}}{M_{${x}+k}}=${seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[8].value({x: i, table})).reduce(sum)}`
    },
    value: ({x, table}) => {
      return seq(table.length-x).map(i=>i+x-1).map(i=>Formulas[8].value({x: i, table})).reduce(sum)
    },
    differeApplicable: false,
  },
  {
    cellFormula: "_{d|n}\\ddot a_x", // 10 : add ddots
    args: ["x","n","d","dots"],
    longFormula: ({x, n, d, table}) => {
      if(d){
        return `_{{${d}}|{${n}}}\\ddot a_{${x}}={{N_{${x+d}}-N_{${x+d+n}}}\over{D_{${x}}}}=${(Formulas[5].value({x: x+d, table})-Formulas[5].value({x: x+n+d, table}))/Formulas[4].value({x, table})}`
      } else {
        return `_{${n}}\\ddot a_{${x}}={{N_{${x}}-N_{${x+n}}}\over{D_{${x}}}}=${(Formulas[5].value({x: x, table})-Formulas[5].value({x: x+n, table}))/Formulas[4].value({x, table})}`
      }
    },
    value: ({x, n, d, table}) => {
      if(d){
        return (Formulas[5].value({x: x+d, table})-Formulas[5].value({x: x+n+d, table}))/Formulas[4].value({x, table})
      } else {
        return (Formulas[5].value({x: x, table})-Formulas[5].value({x: x+n, table}))/Formulas[4].value({x, table})
      }
    },
    differeApplicable: true,
  },
  {
    cellFormula: "_nA_x", // 11 : differé
    args: ["x","n","d"],
    longFormula: ({x, n, table}) => {
      return `_{${n}}\\ddot a_{${x}}={{M_{${x}}-M_{${x+n}}}\over{D_{${x}}}}=${(Formulas[8].value({x: x, table})-Formulas[8].value({x: x+n, table}))/Formulas[4].value({x, table})}`
    },
    value: ({x, n, table}) => {
      return (Formulas[8].value({x: x, table})-Formulas[8].value({x: x+n, table}))/Formulas[4].value({x, table})
    },
    differeApplicable: true,
  },
  {
    cellFormula: "_nE_x", // 12 : differé
    args: ["x","n","d"],
    longFormula: ({x, n, table}) => {
      return `_{${n}}\\ddot a_{${x}}={D_{${x+n}}\over{D_{${x}}}}=${Formulas[4].value({x: x+n, table})/Formulas[4].value({x, table})}`
    },
    value: ({x, n, table}) => {
      return Formulas[4].value({x: x+n, table})/Formulas[4].value({x, table})
    },
    differeApplicable: true,
  },
  {
    cellFormula: "_nD\\ddot a_x", 
    args: ["x","n"],
    longFormula: ({x, table}) => {
      return ``
    },
    value: ({x, table}) => {
      return 1
    },
    differeApplicable: true,
  },
  {
    cellFormula: "_nI\\ddot a_x", 
    args: ["x","n"],
    longFormula: ({x, table}) => {
      return ``
    },
    value: ({x, table}) => {
      return 1
    },
    differeApplicable: true,
  },
  {
    cellFormula: "_np_x", 
    args: ["x","n"],
    longFormula: ({x, table}) => {
      return ``
    },
    value: ({x, table}) => {
      return 1
    },
    differeApplicable: true,
  },
  {
    cellFormula: "_nq_x", 
    args: ["x","n"],
    longFormula: ({x, table}) => {
      return ``
    },
    value: ({x, table}) => {
      return 1
    },
    differeApplicable: true,
  },
  {
    cellFormula: "\\Pi", 
    args: [],
    longFormula: ({x, table}) => {
      return ``
    },
    value: ({x, table}) => {
      return 1
    },
    differeApplicable: true,
  },
  {
    cellFormula: "P", 
    args: [],
    longFormula: ({x, table}) => {
      return ``
    },
    value: ({x, table}) => {
      return 1
    },
    differeApplicable: true,
  },
]

export default Formulas