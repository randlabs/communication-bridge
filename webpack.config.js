const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./config/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
	return webpackMerge.merge(
		{
			mode: mode,
			resolve: {
				extensions: [ '.js' ]
			},
		},
		modeConfig(mode)
	);
};

