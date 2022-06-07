# Easy2Boot - OSes Installation

The free USB multiboot solution for professionals. Copy all ISO files to your USB drive and then Legacy or UEFI boot!

!!! info ""

    [E2B – Main page](https://easy2boot.xyz/){target=_blank}

    [E2B Downloads](https://easy2boot.xyz/download/){target=_blank}

    [E2B Downloads - Latest Betas with bugfixes](https://easy2boot.xyz/download/alternate-download-sites/){target=_blank}

## How to update E2B

Simply extract the files from the E2B download and copy them to your E2B USB drive to update the E2B version, e.g.:

```bash
rsync -auv --preallocate ~/dl/Easy2Boot_v2.13_password_is_e2b/ /run/media/$USER/E2B/
```
## ‘File Not Contiguous’ and ‘Too Many Fragments’ Errors

Most (but not all) E2B payload files need to be contiguous (in sequential sectors/clusters on the disk). If you see this error reported by E2B, then that file may not boot or work correctly! This error most often occurs if you have been deleting and adding several files to the E2B drive and it is very full.

+ Solution for Linux

    Run defragmentation perl script for directory in with a "not contigiuos" iso is, e.g.:

    ```bash
    sudo perl /run/media/$USER/E2B/_ISO/docs/linux_utils/defragfs.pl /run/media/$USER/E2B/_ISO/LINUX
    ```

    ``` warning

        When asked: "Please specify the percentage of files should be defrag (1-100) [33.3333333333333] or hit Enter", hit 100 and then Enter

+ Solution Windows

    Double-click on **\MAKE_THIS_DRIVE_CONTIGUOUS.cmd** on the E2B USB drive.
