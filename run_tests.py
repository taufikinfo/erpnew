#!/usr/bin/env python3
"""
Test Runner Script for ERP Ticket System
Executes all tests for both frontend and backend components
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(command, description, cwd=None):
    """Run a command and return success status"""
    print(f"\n{'='*60}")
    print(f"Running: {description}")
    print(f"Command: {command}")
    print('='*60)
    
    try:
        result = subprocess.run(
            command,
            shell=True,
            cwd=cwd,
            capture_output=True,
            text=True
        )
        
        print(result.stdout)
        if result.stderr:
            print("STDERR:", result.stderr)
            
        if result.returncode == 0:
            print(f"✅ {description} - PASSED")
            return True
        else:
            print(f"❌ {description} - FAILED")
            return False
            
    except Exception as e:
        print(f"❌ {description} - ERROR: {str(e)}")
        return False

def main():
    """Main test runner function"""
    print("🚀 Starting Comprehensive Test Suite for ERP Ticket System")
    
    # Get the project root directory
    project_root = Path(__file__).parent
    backend_dir = project_root / "backend"
    
    results = []
    
    # Frontend Tests
    print("\n🎯 Running Frontend Tests...")
    
    # Check if node_modules exists
    if (project_root / "node_modules").exists():
        results.append(run_command(
            "pnpm test:run",
            "Frontend Unit Tests (Vitest)",
            cwd=project_root
        ))
    else:
        print("⚠️  Node modules not found. Installing dependencies...")
        run_command("pnpm install", "Installing frontend dependencies", cwd=project_root)
        results.append(run_command(
            "pnpm test:run",
            "Frontend Unit Tests (Vitest)",
            cwd=project_root
        ))
    
    # Backend Tests
    print("\n🎯 Running Backend Tests...")
    
    # Check if backend dependencies are installed
    if (backend_dir / "venv").exists() or (backend_dir / ".venv").exists():
        # Using virtual environment
        if sys.platform == "win32":
            python_cmd = str(backend_dir / "venv" / "Scripts" / "python.exe")
            if not os.path.exists(python_cmd):
                python_cmd = str(backend_dir / ".venv" / "Scripts" / "python.exe")
        else:
            python_cmd = str(backend_dir / "venv" / "bin" / "python")
            if not os.path.exists(python_cmd):
                python_cmd = str(backend_dir / ".venv" / "bin" / "python")
        
        results.append(run_command(
            f"{python_cmd} -m pytest tests/ -v",
            "Backend Unit Tests (pytest)",
            cwd=backend_dir
        ))
    else:
        # Using system Python
        results.append(run_command(
            "python -m pytest tests/ -v",
            "Backend Unit Tests (pytest)",
            cwd=backend_dir
        ))
    
    # Test Coverage Reports
    print("\n📊 Generating Test Coverage Reports...")
    
    # Frontend Coverage
    results.append(run_command(
        "pnpm test:coverage",
        "Frontend Coverage Report",
        cwd=project_root
    ))
    
    # Backend Coverage
    if (backend_dir / "venv").exists() or (backend_dir / ".venv").exists():
        results.append(run_command(
            f"{python_cmd} -m pytest tests/ --cov=app --cov-report=html --cov-report=term",
            "Backend Coverage Report",
            cwd=backend_dir
        ))
    else:
        results.append(run_command(
            "python -m pytest tests/ --cov=app --cov-report=html --cov-report=term",
            "Backend Coverage Report",
            cwd=backend_dir
        ))
    
    # Summary
    print("\n" + "="*60)
    print("🎯 TEST SUITE SUMMARY")
    print("="*60)
    
    passed = sum(results)
    total = len(results)
    
    print(f"Total Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {total - passed}")
    print(f"Success Rate: {(passed/total)*100:.1f}%")
    
    if passed == total:
        print("\n🎉 All tests passed! The ticket system is working correctly.")
        sys.exit(0)
    else:
        print(f"\n⚠️  {total - passed} test suite(s) failed. Please review the output above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
