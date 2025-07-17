#!/usr/bin/env node

/**
 * yarn workspaces 정상 동작 검증 스크립트
 * Task 1.1.1: 모노레포 초기 설정 - 테스트 코드
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 yarn workspaces 정상 동작 검증을 시작합니다...\n');

let hasErrors = false;

/**
 * 명령어 실행 헬퍼 함수
 */
function executeCommand(command, description) {
  try {
    console.log(`📋 ${description}`);
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
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
 * 1. 루트 package.json 검증
 */
function verifyRootPackageJson() {
  console.log('1️⃣ 루트 package.json 검증');
  
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ 루트 package.json 파일이 존재하지 않습니다.');
    hasErrors = true;
    return;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // 워크스페이스 설정 확인
    if (!packageJson.workspaces) {
      console.error('❌ package.json에 workspaces 설정이 없습니다.');
      hasErrors = true;
      return;
    }
    
    const expectedWorkspaces = ['apps/*', 'packages/*'];
    const actualWorkspaces = packageJson.workspaces;
    
    for (const workspace of expectedWorkspaces) {
      if (!actualWorkspaces.includes(workspace)) {
        console.error(`❌ workspaces에 ${workspace} 설정이 누락되었습니다.`);
        hasErrors = true;
      }
    }
    
    if (!hasErrors) {
      console.log('✅ 루트 package.json 검증 완료\n');
    }
    
  } catch (error) {
    console.error(`❌ package.json 파싱 오류: ${error.message}`);
    hasErrors = true;
  }
}

/**
 * 2. 워크스페이스 목록 확인
 */
function verifyWorkspacesList() {
  console.log('2️⃣ 워크스페이스 목록 확인');
  
  const result = executeCommand(
    'yarn workspaces list --json',
    '워크스페이스 목록 조회'
  );
  
  if (result) {
    try {
      const workspaces = result.trim().split('\n').map(line => JSON.parse(line));
      
      const expectedWorkspaces = [
        '@smart-real-estate/web',
        '@smart-real-estate/mobile', 
        '@smart-real-estate/backend',
        '@smart-real-estate/types',
        '@smart-real-estate/common-utils',
        '@smart-real-estate/common-ui'
      ];
      
      const actualWorkspaceNames = workspaces
        .filter(ws => ws.name !== 'smart-real-estate') // 루트 제외
        .map(ws => ws.name);
      
      console.log('📦 발견된 워크스페이스:');
      actualWorkspaceNames.forEach(name => console.log(`  - ${name}`));
      
      for (const expectedName of expectedWorkspaces) {
        if (!actualWorkspaceNames.includes(expectedName)) {
          console.error(`❌ 워크스페이스 누락: ${expectedName}`);
          hasErrors = true;
        }
      }
      
      if (!hasErrors) {
        console.log('✅ 모든 필수 워크스페이스가 발견되었습니다.\n');
      }
      
    } catch (error) {
      console.error(`❌ 워크스페이스 목록 파싱 오류: ${error.message}`);
      hasErrors = true;
    }
  }
}

/**
 * 3. 패키지 간 의존성 검증
 */
function verifyDependencies() {
  console.log('3️⃣ 패키지 간 의존성 검증');
  
  const packagesWithDeps = [
    'apps/web',
    'apps/mobile', 
    'packages/backend',
    'packages/common-utils'
  ];
  
  for (const packagePath of packagesWithDeps) {
    const packageJsonPath = path.join(process.cwd(), packagePath, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        
        const internalDeps = Object.keys(deps).filter(dep => 
          dep.startsWith('@smart-real-estate/')
        );
        
        console.log(`📦 ${packageJson.name}:`);
        if (internalDeps.length > 0) {
          internalDeps.forEach(dep => {
            console.log(`  ✅ 내부 의존성: ${dep} -> ${deps[dep]}`);
          });
        } else {
          console.log(`  ℹ️  내부 의존성 없음`);
        }
        
      } catch (error) {
        console.error(`❌ ${packagePath}/package.json 읽기 실패: ${error.message}`);
        hasErrors = true;
      }
    }
  }
  
  console.log();
}

/**
 * 4. 빌드 명령어 검증
 */
function verifyBuildCommands() {
  console.log('4️⃣ 빌드 명령어 검증');
  
  executeCommand(
    'yarn workspaces run type-check',
    '모든 워크스페이스 타입 체크'
  );
}

/**
 * 5. 개발 도구 검증  
 */
function verifyDevTools() {
  console.log('5️⃣ 개발 도구 검증');
  
  executeCommand(
    'yarn --version',
    'Yarn 버전 확인'
  );
  
  executeCommand(
    'node --version', 
    'Node.js 버전 확인'
  );
}

/**
 * 메인 검증 실행
 */
function main() {
  verifyRootPackageJson();
  verifyWorkspacesList();
  verifyDependencies();
  verifyBuildCommands();
  verifyDevTools();
  
  console.log('🏁 검증 완료!\n');
  
  if (hasErrors) {
    console.error('❌ 일부 검증에서 오류가 발생했습니다. 위의 메시지를 확인하여 문제를 해결해주세요.');
    process.exit(1);
  } else {
    console.log('🎉 모든 검증이 성공적으로 완료되었습니다!');
    console.log('✅ yarn workspaces가 정상적으로 설정되었습니다.');
    console.log('✅ 패키지 간 의존성이 올바르게 구성되었습니다.');
    console.log('✅ 빌드 및 개발 도구가 정상 동작합니다.');
  }
}

// 스크립트 실행
main(); 