module.exports ={
    extends: ['@commitlint/config-conventional'],
    rules:{
        "header-min-length": [2, "always", 10],
        "header-max-length": [2, "always", 100],
        "header-case": [2, "always", "lower-case"],
    },
    plugins:[
        {
            rules:{
              "header-case-start-capital":({raw})=>{
                return[
                    /^# [A-Z]/.test(raw[0]),
                    "Commit message should start with a capital letter"
                ]
              }
            },
            "header-end-period":({raw})=>{
                return[
                    /\.$/.test(raw[0]),
                    "Commit message should end with a period"
                ]
            }
        }
    ]
}

'@ | Out-File -Encoding utf8 commitlint.config.js'