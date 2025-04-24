const { execSync } = require('child_process');

try {
  // For macOS and Linux
  const command = "lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9";
  execSync(command);
  console.log('Successfully killed process on port 3001');
} catch (error) {
  // If no process was found, that's fine
  console.log('No process was running on port 3001');
} 