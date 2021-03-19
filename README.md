# OBSIDIAN GRAB - Chrome Extension

Do Add the below Script while Creating a Workflow to enable Obsidian Grab


# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. 
on:
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
    inputs:
      data:
        description: 'Content that needs to be added to your obsidian'
        required: true
        default: 'Test Content'


# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  add_content:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Runs a set of commands using the runners shell
      - name: Add data and commit # transfer the new html files back into the repository
        run: |
          echo "- ${{ github.event.inputs.data }}" >> "Quick Capture.md"
          git config --local user.name "Obsidian Chrome Extension"
          git add .
          git commit -m "Adding data from the extension"   
      - name: Push changes # push the output folder to your repo
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          force: true
