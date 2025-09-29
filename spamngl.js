const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const inq = require('inquirer');
const figlet = require('figlet');
const { spawn } = require('child_process');

const grad = (txt) => {
  const c = [chalk.hex('#ff2a6d'), chalk.hex('#05d9e8'), chalk.hex('#d1f7ff'), chalk.hex('#ffcc00')];
  return [...txt].map((ch, i) => c[i % c.length](ch)).join('');
};

const banner = () => {
  console.clear();
  console.log(
    grad(figlet.textSync('Spam Ngl', { font: 'Small' })) +
    '\n' +
    chalk.bold.hex('#05d9e8')('═'.repeat(50)) + '\n' +
    chalk.bold.hex('#ff2a6d')('Author  : ') + chalk.bold.hex('#d1f7ff')('FikXzMods') + '\n' +
    chalk.bold.hex('#ff2a6d')('GitHub  : ') + chalk.bold.hex('#d1f7ff')('FikXzModsDeveloper') + '\n' +
    chalk.bold.hex('#05d9e8')('═'.repeat(50)) + '\n'
  );
};

const openChannel = () => {
  setTimeout(() => {
    try {
      spawn('am', ['start', '--user', '0', '-a', 'android.intent.action.VIEW', '-d', 'https://whatsapp.com/channel/0029Vb6Jjyf8KMqtrGJZJy0y'], { stdio: 'ignore' });
    } catch {}
  }, 100);
};

async function spamNGL(user, msg, count) {
  const spinner = ora({
    text: chalk.cyan('Mengirim 0 / ' + count),
    spinner: 'dots12',
  }).start();

  let ok = 0, fail = 0;

  for (let i = 1; i <= count; i++) {
    try {
      const { data } = await axios.get(
        'https://api.fikmydomainsz.xyz/tools/spamngl',
        {
          params: {
            url: `https://ngl.link/${user}`,
            message: msg,
            count: 1,
          },
          timeout: 19000,
        }
      );
      data.status ? ok++ : fail++;
    } catch {
      fail++;
    }
    spinner.text = chalk.cyan(`Mengirim ${ok + fail} / ${count}`);
  }

  spinner.stop();

  console.log('\n' + chalk.bold.green('✅ Selesai!'));
  console.log(
    chalk.bold.hex('#05d9e8')('┌──────────────┬─────────────┐\n') +
    chalk.bold.hex('#05d9e8')('│ Total kirim  │ ') + chalk.bold.hex('#d1f7ff')(String(ok + fail).padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
    chalk.bold.hex('#05d9e8')('│ Sukses       │ ') + chalk.bold.hex('#05d7a0')(String(ok).padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
    chalk.bold.hex('#05d9e8')('│ Gagal        │ ') + chalk.bold.hex('#ff2a6d')(String(fail).padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
    chalk.bold.hex('#05d9e8')('└──────────────┴─────────────┘\n')
  );
}

(async () => {
  banner();
  openChannel();
  const a = await inq.prompt([
    { type: 'input', name: 'u', message: 'Username target:' },
    { type: 'input', name: 'm', message: 'Input Pesan :' },
    { type: 'number', name: 'c', message: 'Input pesan:', default: 18 },
  ]);
  await spamNGL(a.u, a.m, a.c);
})();
