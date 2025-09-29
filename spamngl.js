const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const inq = require('inquirer');
const figlet = require('figlet');

const grad = (txt) => {
  const c = [chalk.hex('#ff2a6d'), chalk.hex('#05d9e8'), chalk.hex('#d1f7ff'), chalk.hex('#ffcc00')];
  return [...txt].map((ch, i) => c[i % c.length](ch)).join('');
};

const banner = () => {
  console.clear();
  console.log(
    grad(figlet.textSync('Spam Ngl', { font: 'Small' })) +
    '\n' +
    chalk.bold.hex('#05d9e8')('╔' + '═'.repeat(48) + '╗') + '\n' +
    chalk.bold.hex('#05d9e8')('║ ') +
      chalk.bold.hex('#ff2a6d')('Script  : ') + chalk.bold.hex('#d1f7ff')('Spammer ngl cli'.padEnd(28)) +
    chalk.bold.hex('#05d9e8')('║') + '\n' +
    chalk.bold.hex('#05d9e8')('║ ') +
      chalk.bold.hex('#ff2a6d')('Versi   : ') + chalk.bold.hex('#d1f7ff')('1.0.0'.padEnd(34)) +
    chalk.bold.hex('#05d9e8')('║') + '\n' +
    chalk.bold.hex('#05d9e8')('║ ') +
      chalk.bold.hex('#ff2a6d')('Author  : ') + chalk.bold.hex('#d1f7ff')('FikXzModss'.padEnd(31)) +
    chalk.bold.hex('#05d9e8')('║') + '\n' +
    chalk.bold.hex('#05d9e8')('║ ') +
      chalk.bold.hex('#ff2a6d')('GitHub  : ') + chalk.bold.hex('#d1f7ff')('github.com/FikXzModzDeveloper'.padEnd(22)) +
    chalk.bold.hex('#05d9e8')('║') + '\n' +
    chalk.bold.hex('#05d9e8')('╚' + '═'.repeat(48) + '╝') + '\n'
  );
};

async function spamNGL(user, msg, count) {
  const spinner = ora({
    text: chalk.cyan('Loading...'),
    spinner: 'dots12',
  }).start();

  try {
    const { data } = await axios.get(
      'https://api.fikmydomainsz.xyz/tools/spamngl',
      {
        params: {
          url: `https://ngl.link/${user}`,
          message: msg,
          count: count,
        },
        timeout: 20000,
      }
    );

    spinner.stop();

    if (data.status) {
      console.log('\n' + chalk.bold.green('✅ Selesai!'));
      console.log(
        chalk.bold.hex('#05d9e8')('┌──────────────┬─────────────┐\n') +
        chalk.bold.hex('#05d9e8')('│ Username     │ ') + chalk.bold.hex('#d1f7ff')(data.username.padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
        chalk.bold.hex('#05d9e8')('│ Pesan        │ ') + chalk.bold.hex('#d1f7ff')(data.message.padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
        chalk.bold.hex('#05d9e8')('│ Total kirim  │ ') + chalk.bold.hex('#d1f7ff')(String(data.count).padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
        chalk.bold.hex('#05d9e8')('│ Sukses       │ ') + chalk.bold.hex('#05d7a0')(String(data.results.success).padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
        chalk.bold.hex('#05d9e8')('│ Gagal        │ ') + chalk.bold.hex('#ff2a6d')(String(data.results.failed).padEnd(11)) + chalk.bold.hex('#05d9e8')('│\n') +
        chalk.bold.hex('#05d9e8')('└──────────────┴─────────────┘\n')
      );
    } else {
      console.log(chalk.red('\n❌ Gagal mengirim spam.'));
    }
  } catch (err) {
    spinner.stop();
    console.error(chalk.red('\n❌ Error:'), err.message);
  }
}

(async () => {
  banner();
  const a = await inq.prompt([
    { type: 'input', name: 'u', message: 'Username target:' },
    { type: 'input', name: 'm', message: 'Input Pesan:' },
    { type: 'number', name: 'c', message: 'Jumlah pesan:', default: 18 },
  ]);
  await spamNGL(a.u, a.m, a.c);
})();
