const ids = [
      {
            "line1": "email",
            "line2": "zampinjosh@proton.me",
            "qrurl": "email.png"
      },
      {
            "line1": "email",
            "line2": "joshua@worldcomputer.info",
            "qrurl": "email1.png"
      },
      {
            "line1": "phone-mobile",
            "line2": "774-450-5656",
            "qrurl": "phone-mobile.png"
      },
      {
            "line1": "phone-google",
            "line2": "707-502-2682",
            "qrurl": "phone-google.png"
      },
      {
            "line1": "memo.cash",
            "line2": "<a href='https://memo.cash/profile/197zNTgVdo7Msc2cPbLpXHmhmVmWtZgjYx'>197zNTgVdo7Msc2cPbLpXHmhmVmWtZgjYx</a>",
            "qrurl": "memo.png"
      },
      {
            "line1": "x.com",
            "line2": "https://x.com/josh_zampino",
            "qrurl": "x.png"
      },
      {
            "line1": "gitlab",
            "line2": "https://gitlab.com/snff",
            "qrurl": "gitlab.png"
      },
      {
            "line1": "github",
            "line2": "https://github/snff-io",
            "qrurl": "github.png"
      },
      {
            "line1": "bitcoin cash (bch)",
            "line2": "qq6g43n6nsu9kxcazgkyxqsxc7ancgfqfuxz28w68e",
            "qrurl": "bch.png"
      },
      {
            "line1": "bitcoin cash (memo))",
            "line2": "qpv3xerpqh7h6yfy2zm3np95qqdpszcx7gkv55q2ss",
            "qrurl": "bch.memo.png"
      },
      {
            "line1": "bitcoin (btc)",
            "line2": "bc1qj6fyj2q9pp9yyens52pzqmxg9fj92yr2fnhge8",
            "qrurl": "btc.png"
      },
      {
            "line1": "etherium (eth)",
            "line2": "Ox7a0Df01Fe9BAF8E2f8C58Ba32002cD35a48cd586",
            "qrurl": "etc.png"
      },
      {
            "line1": "ens",
            "line2": "zedskee.cb.id",
            "qrurl": "ens.png"
      },
      {
            "line1": "fio",
            "line2": "zedskee@edge",
            "qrurl": "fio.png"
      },
      {
            "line1": "physical",
            "line2": "SOUTH LANCASTER, MA 01561",
            "qrurl": "physical.png"
      }
]

if (typeof module !== 'undefined' && module.exports) {
      module.exports.generate_qrcodes = function () {
            const { exec } = require('child_process');

            //qrencode
            ids.forEach(function (id) {
                  var cmd = "qrencode -t png -l H -m 1 -v 4 -s 4 -o '../img/" + id.qrurl + "' '" + id.line2 + "'";
                  console.log(cmd);
                  exec(cmd, (err, stdout) => {
                        if (err) {
                              console.error(err);
                              return;
                        }
                        if (stdout)
                              console.log(stdout);
                  });
            });
      };
}
