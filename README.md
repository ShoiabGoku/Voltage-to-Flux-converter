# Voltage to Heat Flux Converter

**Live tool:** https://shoiabgoku.github.io/Voltage-to-Flux-converter/

Convert voltage–time measurement data to surface heat flux (W/cm²) using the **Cook-Felderman** semi-infinite body method with **Savitzky-Golay** smoothing — entirely in your browser.

## Features

- Cook-Felderman heat flux reduction
- Savitzky-Golay noise smoothing (configurable window & polynomial order)
- Upload `.xlsx`, `.xls`, or `.csv` files — multiple sheets supported
- Multi-dataset overlay plots with colour-coded legend
- Download results as PNG charts and CSV files
- Advanced controls: axis limits, guide lines, colour schemes, peak tracking
- 100% client-side — no data is uploaded, no account required

## Usage

1. Open the [live tool](https://shoiabgoku.github.io/Voltage-to-Flux-converter/)
2. Upload your voltage vs. time Excel or CSV file(s)
3. Set gain, baseline points, beta, and sensitivity for your gauge
4. Click **Generate Heat Flux Graphs**
5. Download the PNG plots or CSV data

## Input format

Each file (or sheet) must have **time** in the first numeric column and **voltage** in the second numeric column. Headers are ignored automatically.

Developer: Shoiab Akhtar
