# 3. Install NPM packages
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then  
  cd "$DEPLOYMENT_TARGET"
  eval $NPM_CMD install --production
  eval $NPM_CMD install --only=dev
  exitWithMessageOnError "npm failed"
  cd - > /dev/null
fi 

# 4. Angular Prod Build
if [ -e "$DEPLOYMENT_TARGET/.angular-cli.json" ]; then  
  cd "$DEPLOYMENT_TARGET"
  eval ./node_modules/.bin/ng build --prod
  exitWithMessageOnError "Angular build failed"
  cd - > /dev/null
fi  