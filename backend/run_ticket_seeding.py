#!/usr/bin/env python3
"""
Quick Ticket Seeding Script
Run this script to add more ticket dummy data to your existing database.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from seed_tickets import seed_tickets

def main():
    print("🎫 Ticket Data Seeding Tool")
    print("=" * 40)
    print("This script will add dummy ticket data to your database.")
    print("Make sure the database is running and accessible.")
    print()
    
    response = input("Do you want to proceed? (y/N): ")
    if response.lower() in ['y', 'yes']:
        try:
            seed_tickets()
        except Exception as e:
            print(f"❌ Failed to seed tickets: {e}")
            sys.exit(1)
    else:
        print("Operation cancelled.")
        sys.exit(0)

if __name__ == "__main__":
    main()
