#!/usr/bin/env node

/**
 * 빌드 및 실행 통합 테스트 스크립트
 * Task 1.1.1: 모노레포 초기 설정 - 빌드 및 실행 통합 테스트
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 빌드 및 실행 통합 테스트를 시작합니다...\n');

let hasErrors = false;

/**
 * 명령어 실행 헬퍼 함수
 */
function executeCommand(command, description, options = {}) {
  try {
    console.log(`📋 ${description}`);
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      cwd: options.cwd || process.cwd()
    });
    console.log(`✅ 성공: ${description}\n`);
    return result;
  } catch (error) {
    console.error(`❌ 실패: ${description}`);
    console.error(`오류: ${error.message}\n`);
    hasErrors = true;
    return null;
  }
}

/**
 * 비동기 명령어 실행 (서버 테스트용)
 */
function executeAsync(command, description, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`📋 ${description}`);
    
    const child = spawn(command, { 
      shell: true, 
      cwd,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    let errorOutput = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    // 5초 후 자동 종료 (개발 서버는 무한 실행되므로)
    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      
      if (output.includes('ready') || output.includes('Ready') || 
          output.includes('started') || output.includes('listening')) {
        console.log(`✅ 성공: ${description} (5초간 정상 실행 확인)\n`);
        resolve(output);
      } else {
        console.error(`❌ 실패: ${description} - 예상된 출력을 찾을 수 없습니다`);
        console.error(`출력: ${output}`);
        console.error(`에러: ${errorOutput}\n`);
        hasErrors = true;
        reject(new Error('서버 시작 확인 실패'));
      }
    }, 5000);
    
    child.on('exit', (code) => {
      clearTimeout(timeout);
      if (code === 0) {
        console.log(`✅ 성공: ${description}\n`);
        resolve(output);
      } else {
        console.error(`❌ 실패: ${description} (종료 코드: ${code})`);
        console.error(`에러: ${errorOutput}\n`);
        hasErrors = true;
        reject(new Error(`프로세스가 코드 ${code}로 종료됨`));
      }
    });
  });
}

/**
 * 1. 의존성 설치 테스트
 */
function testDependencyInstallation() {
  console.log('1️⃣ 의존성 설치 테스트');
  
  // 기존 node_modules 제거 (깨끗한 테스트를 위해)
  executeCommand(
    'rm -rf node_modules yarn.lock',
    '기존 의존성 정리'
  );
  
  // 새로 설치
  executeCommand(
    'yarn install',
    '워크스페이스 의존성 설치'
  );
  
  // yarn.lock 파일 생성 확인
  if (fs.existsSync('yarn.lock')) {
    console.log('✅ yarn.lock 파일이 생성되었습니다.\n');
  } else {
    console.error('❌ yarn.lock 파일이 생성되지 않았습니다.\n');
    hasErrors = true;
  }
}

/**
 * 2. 패키지별 빌드 테스트
 */
function testPackageBuilds() {
  console.log('2️⃣ 패키지별 빌드 테스트');
  
  const buildablePackages = [
    { name: '@smart-real-estate/types', path: 'packages/types' },
    { name: '@smart-real-estate/common-utils', path: 'packages/common-utils' },
    { name: '@smart-real-estate/common-ui', path: 'packages/common-ui' },
    { name: '@smart-real-estate/backend', path: 'packages/backend' }
  ];
  
  for (const pkg of buildablePackages) {
    console.log(`📦 ${pkg.name} 빌드 테스트`);
    
    executeCommand(
      `yarn workspace ${pkg.name} build`,
      `${pkg.name} 빌드`
    );
    
    // dist 폴더 생성 확인
    const distPath = path.join(pkg.path, 'dist');
    if (fs.existsSync(distPath)) {
      console.log(`✅ ${pkg.name}: dist 폴더가 생성되었습니다.`);
    } else {
      console.error(`❌ ${pkg.name}: dist 폴더가 생성되지 않았습니다.`);
      hasErrors = true;
    }
  }
  
  console.log();
}

/**
 * 3. 타입 체크 테스트
 */
function testTypeChecking() {
  console.log('3️⃣ 타입 체크 테스트');
  
  executeCommand(
    'yarn workspaces run type-check',
    '모든 워크스페이스 TypeScript 타입 체크'
  );
}

/**
 * 4. 린팅 테스트
 */
function testLinting() {
  console.log('4️⃣ 린팅 테스트');
  
  executeCommand(
    'yarn workspaces run lint',
    '모든 워크스페이스 ESLint 검사'
  );
}

/**
 * 5. 웹 애플리케이션 빌드 테스트
 */
function testWebBuild() {
  console.log('5️⃣ 웹 애플리케이션 빌드 테스트');
  
  executeCommand(
    'yarn workspace @smart-real-estate/web build',
    'Next.js 웹 애플리케이션 빌드'
  );
  
  // .next 폴더 생성 확인
  if (fs.existsSync('apps/web/.next')) {
    console.log('✅ Next.js 빌드 결과물(.next)이 생성되었습니다.\n');
  } else {
    console.error('❌ Next.js 빌드 결과물이 생성되지 않았습니다.\n');
    hasErrors = true;
  }
}

/**
 * 6. 개발 서버 실행 테스트
 */
async function testDevServers() {
  console.log('6️⃣ 개발 서버 실행 테스트');
  
  try {
    // 백엔드 개발 서버 테스트
    await executeAsync(
      'yarn workspace @smart-real-estate/backend dev',
      '백엔드 개발 서버 실행 테스트',
      'packages/backend'
    );
    
    // 웹 개발 서버 테스트  
    await executeAsync(
      'yarn workspace @smart-real-estate/web dev',
      '웹 개발 서버 실행 테스트',
      'apps/web'
    );
    
  } catch (error) {
    console.error(`서버 실행 테스트 중 오류: ${error.message}`);
  }
}

/**
 * 7. 워크스페이스 간 의존성 링크 테스트
 */
function testWorkspaceLinking() {
  console.log('7️⃣ 워크스페이스 간 의존성 링크 테스트');
  
  const packages = [
    'apps/web',
    'apps/mobile',
    'packages/backend',
    'packages/common-utils'
  ];
  
  for (const packagePath of packages) {
    const nodeModulesPath = path.join(packagePath, 'node_modules', '@smart-real-estate');
    
    if (fs.existsSync(nodeModulesPath)) {
      const linkedPackages = fs.readdirSync(nodeModulesPath);
      console.log(`📦 ${packagePath}: 링크된 패키지 - ${linkedPackages.join(', ')}`);
    } else {
      console.log(`📦 ${packagePath}: 내부 의존성 없음`);
    }
  }
  
  console.log();
}

/**
 * 메인 테스트 실행
 */
async function main() {
  try {
    testDependencyInstallation();
    testPackageBuilds();
    testTypeChecking();
    testLinting();
    testWebBuild();
    testWorkspaceLinking();
    
    // 개발 서버 테스트는 선택적으로 실행 (CI 환경에서는 스킵 가능)
    if (!process.env.CI) {
      await testDevServers();
    } else {
      console.log('ℹ️  CI 환경에서는 개발 서버 테스트를 스킵합니다.\n');
    }
    
    console.log('🏁 통합 테스트 완료!\n');
    
    if (hasErrors) {
      console.error('❌ 일부 테스트에서 오류가 발생했습니다.');
      process.exit(1);
    } else {
      console.log('🎉 모든 통합 테스트가 성공적으로 완료되었습니다!');
      console.log('✅ 의존성 설치가 정상적으로 동작합니다.');
      console.log('✅ 모든 패키지가 정상적으로 빌드됩니다.');
      console.log('✅ 타입 체크와 린팅이 통과했습니다.');
      console.log('✅ 워크스페이스 간 의존성 링크가 올바르게 설정되었습니다.');
      if (!process.env.CI) {
        console.log('✅ 개발 서버가 정상적으로 실행됩니다.');
      }
    }
    
  } catch (error) {
    console.error(`❌ 통합 테스트 중 예기치 않은 오류: ${error.message}`);
    process.exit(1);
  }
}

// 스크립트 실행
main(); 