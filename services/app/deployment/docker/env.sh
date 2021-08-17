#!/bin/bash

# Recreate config file
rm -rf env-config.js
touch env-config.js

# Add assignment
echo "window._dropdeck_env = {" >> env-config.js
echo "  apiHost: \"$REACT_APP_API_HOST\"," >> env-config.js
echo "  googleAnalytics: \"$REACT_APP_GOOGLE_ANALYTICS\"," >> env-config.js
echo "  fullStory: \"$REACT_APP_FULLSTORY\"," >> env-config.js
echo "  modules: {" >> env-config.js
echo "    exportPlayer: \"$REACT_APP_MODULES_EXPORT_PLAYER\"," >> env-config.js
echo "  }" >> env-config.js
echo "};" >> env-config.js
