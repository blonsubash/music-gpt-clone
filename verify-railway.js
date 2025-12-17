#!/usr/bin/env node

/**
 * Pre-deployment verification script for Railway
 * Run this before deploying to catch common issues
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Verifying Railway deployment setup...\n");

let hasErrors = false;
let hasWarnings = false;

// Check required files
const requiredFiles = [
  { path: "package.json", critical: true },
  { path: "server.js", critical: true },
  { path: "next.config.ts", critical: true },
  { path: "railway.toml", critical: false },
  { path: ".railwayignore", critical: false },
];

console.log("📁 Checking required files...");
requiredFiles.forEach(({ path: filePath, critical }) => {
  const exists = fs.existsSync(filePath);
  if (exists) {
    console.log(`  ✅ ${filePath}`);
  } else {
    if (critical) {
      console.log(`  ❌ ${filePath} - MISSING (CRITICAL)`);
      hasErrors = true;
    } else {
      console.log(`  ⚠️  ${filePath} - MISSING (optional)`);
      hasWarnings = true;
    }
  }
});

// Check package.json scripts
console.log("\n📦 Checking package.json scripts...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

  const requiredScripts = ["dev", "build", "start"];
  requiredScripts.forEach((script) => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`  ✅ ${script}: "${packageJson.scripts[script]}"`);
    } else {
      console.log(`  ❌ ${script} script missing`);
      hasErrors = true;
    }
  });

  // Verify start script uses server.js
  if (
    packageJson.scripts.start &&
    !packageJson.scripts.start.includes("server.js")
  ) {
    console.log(
      "  ⚠️  Warning: start script should use server.js for WebSocket support"
    );
    hasWarnings = true;
  }

  // Check Socket.IO dependency
  if (packageJson.dependencies && packageJson.dependencies["socket.io"]) {
    console.log(`  ✅ socket.io dependency found`);
  } else {
    console.log(`  ❌ socket.io dependency missing`);
    hasErrors = true;
  }
} catch (error) {
  console.log(`  ❌ Error reading package.json: ${error.message}`);
  hasErrors = true;
}

// Check for .env.local (development)
console.log("\n🔐 Checking environment files...");
if (fs.existsSync(".env.local")) {
  console.log("  ✅ .env.local exists (for local development)");
  try {
    const envContent = fs.readFileSync(".env.local", "utf8");
    if (envContent.includes("NEXT_PUBLIC_SOCKET_URL")) {
      console.log("  ✅ NEXT_PUBLIC_SOCKET_URL configured");
    } else {
      console.log("  ⚠️  NEXT_PUBLIC_SOCKET_URL not found in .env.local");
      hasWarnings = true;
    }
  } catch (error) {
    console.log(`  ⚠️  Error reading .env.local: ${error.message}`);
    hasWarnings = true;
  }
} else {
  console.log("  ⚠️  .env.local not found (will use defaults)");
  hasWarnings = true;
}

// Check .gitignore
console.log("\n🚫 Checking .gitignore...");
if (fs.existsSync(".gitignore")) {
  const gitignore = fs.readFileSync(".gitignore", "utf8");
  const shouldIgnore = [".env", "node_modules", ".next"];
  shouldIgnore.forEach((item) => {
    if (gitignore.includes(item)) {
      console.log(`  ✅ ${item} is ignored`);
    } else {
      console.log(`  ⚠️  ${item} should be in .gitignore`);
      hasWarnings = true;
    }
  });
} else {
  console.log("  ❌ .gitignore missing");
  hasErrors = true;
}

// Check Socket.IO client configuration
console.log("\n🔌 Checking Socket.IO client setup...");
const socketHookPath = "hooks/useSocket.ts";
if (fs.existsSync(socketHookPath)) {
  const socketContent = fs.readFileSync(socketHookPath, "utf8");

  if (
    socketContent.includes("localhost:3000") &&
    !socketContent.includes("NEXT_PUBLIC_SOCKET_URL")
  ) {
    console.log("  ❌ Socket.IO still hardcoded to localhost:3000");
    console.log("     This will not work in production!");
    hasErrors = true;
  } else if (
    socketContent.includes("window.location.origin") ||
    socketContent.includes("NEXT_PUBLIC_SOCKET_URL")
  ) {
    console.log("  ✅ Socket.IO configured for dynamic URL");
  } else {
    console.log("  ⚠️  Unable to verify Socket.IO configuration");
    hasWarnings = true;
  }
} else {
  console.log(`  ❌ ${socketHookPath} not found`);
  hasErrors = true;
}

// Check server.js for proper hostname binding
console.log("\n🖥️  Checking server configuration...");
if (fs.existsSync("server.js")) {
  const serverContent = fs.readFileSync("server.js", "utf8");

  if (
    serverContent.includes('hostname = dev ? "localhost" : "0.0.0.0"') ||
    serverContent.includes('hostname: dev ? "localhost" : "0.0.0.0"')
  ) {
    console.log("  ✅ Server configured for production (0.0.0.0)");
  } else if (
    serverContent.includes('hostname = "localhost"') ||
    serverContent.includes('hostname: "localhost"')
  ) {
    console.log("  ⚠️  Server hostname hardcoded to localhost");
    console.log("     Consider using 0.0.0.0 for production");
    hasWarnings = true;
  }

  if (serverContent.includes("process.env.PORT")) {
    console.log("  ✅ Server uses PORT environment variable");
  } else {
    console.log("  ❌ Server doesn't use PORT environment variable");
    hasErrors = true;
  }
} else {
  console.log("  ❌ server.js not found");
  hasErrors = true;
}

// Final summary
console.log("\n" + "=".repeat(50));
if (hasErrors) {
  console.log("❌ DEPLOYMENT CHECK FAILED");
  console.log("\nPlease fix the errors above before deploying to Railway.");
  process.exit(1);
} else if (hasWarnings) {
  console.log("⚠️  DEPLOYMENT CHECK PASSED (with warnings)");
  console.log("\nYou can deploy, but consider addressing the warnings above.");
  process.exit(0);
} else {
  console.log("✅ DEPLOYMENT CHECK PASSED");
  console.log("\n🚀 Your app is ready to deploy to Railway!");
  console.log("\nNext steps:");
  console.log("  1. git add .");
  console.log('  2. git commit -m "Configure for Railway deployment"');
  console.log("  3. git push origin main");
  console.log("  4. Go to https://railway.app and deploy!");
  process.exit(0);
}
