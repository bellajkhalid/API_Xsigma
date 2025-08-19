#!/bin/bash

# XSigma Automatic Server Update Script
# Cross-platform shell script version

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${CYAN}========================================"
    echo -e "    XSigma Automatic Server Update"
    echo -e "========================================${NC}"
    echo ""
}

print_step() {
    echo -e "${BLUE}[$1/$2] $3${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

show_help() {
    echo -e "${CYAN}XSigma Automatic Server Update Script${NC}"
    echo ""
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./quick-update.sh [options]"
    echo ""
    echo -e "${YELLOW}Options:${NC}"
    echo "  -m, --message <msg>    Custom commit message"
    echo "  -f, --force           Skip confirmation prompts"
    echo "  -s, --skip-build      Skip frontend build (faster)"
    echo "  -h, --help            Show this help message"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  ./quick-update.sh"
    echo "  ./quick-update.sh -m 'Fix navigation bug'"
    echo "  ./quick-update.sh --force --skip-build"
    exit 0
}

# Parse command line arguments
COMMIT_MESSAGE=""
FORCE=false
SKIP_BUILD=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -m|--message)
            COMMIT_MESSAGE="$2"
            shift 2
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -s|--skip-build)
            SKIP_BUILD=true
            shift
            ;;
        -h|--help)
            show_help
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_help
            ;;
    esac
done

# Main script
main() {
    print_header

    # Check if we're in the right directory
    if [ ! -d "Frontend_Xsigma" ]; then
        print_error "Frontend_Xsigma directory not found."
        echo -e "${YELLOW}Please run this script from the project root directory.${NC}"
        exit 1
    fi

    # Check git status
    print_info "Checking git status..."
    git_changes=$(git status --porcelain)
    
    if [ -z "$git_changes" ]; then
        print_info "No local changes detected. Checking if server needs update..."
        skip_commit=true
    else
        skip_commit=false
        echo ""
        echo -e "${YELLOW}📝 Current changes:${NC}"
        git status --short
        echo ""
        
        if [ -z "$COMMIT_MESSAGE" ]; then
            read -p "💬 Enter commit message (or press Enter for 'Quick update'): " COMMIT_MESSAGE
            if [ -z "$COMMIT_MESSAGE" ]; then
                COMMIT_MESSAGE="Quick update"
            fi
        fi
    fi

    # Step 1: Push to GitHub (if there are changes)
    if [ "$skip_commit" = false ]; then
        print_step 1 3 "📤 Pushing changes to GitHub..."
        
        git add .
        git commit -m "$COMMIT_MESSAGE"
        git push origin main
        
        if [ $? -ne 0 ]; then
            print_error "Failed to push to GitHub"
            echo -e "${YELLOW}Please check your internet connection and GitHub credentials.${NC}"
            exit 1
        fi
        
        print_success "Successfully pushed to GitHub!"
    fi

    # Step 2: Update production server
    print_step 2 3 "🔄 Updating production server..."
    echo -e "${CYAN}Connecting to debian@51.83.47.117...${NC}"
    echo ""

    # SSH command to update server
    ssh debian@51.83.47.117 "cd /home/debian/api-xsigma && ./update-from-github.sh"

    if [ $? -ne 0 ]; then
        print_error "Failed to update server"
        echo -e "${YELLOW}Please check your SSH connection and server status.${NC}"
        exit 1
    fi

    # Step 3: Completion
    print_step 3 3 "✅ Update completed successfully!"
    echo ""
    echo -e "${GREEN}🌐 Your website has been updated:${NC}"
    echo -e "${CYAN}  • Production: https://xsigma.co.uk/${NC}"
    echo -e "${CYAN}  • Server IP:  http://51.83.47.117/${NC}"
    echo ""
    echo -e "${YELLOW}💡 Tip: Clear your browser cache if you don't see changes immediately.${NC}"
    echo ""

    if [ "$FORCE" = false ]; then
        echo -e "${YELLOW}Press any key to continue...${NC}"
        read -n 1 -s
    fi
}

# Run main function
main "$@"
