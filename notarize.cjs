const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  // Pula notarização quando a identidade é nula (build de desenvolvimento)
  if (!context.packager.config.mac || context.packager.config.mac.identity === null) {
    console.log('Pulando notarização: identidade é nula');
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appBundleId = context.packager.config.appId;

  try {
    console.log(`Notarizando ${appBundleId} encontrado em ${appOutDir}/${appName}.app`);
    await notarize({
      tool: 'notarytool',
      appPath: `${appOutDir}/${appName}.app`,
      teamId: process.env.APPLE_TEAM_ID,
    });
    console.log(`Notarização concluída para ${appBundleId}`);
  } catch (error) {
    console.error('Falha na notarização:', error);
    throw error;
  }
};
