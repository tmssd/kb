# Linux

!!! info ""

    + [Linux Handbook](https://linuxhandbook.com/)

## Applications

!!! info ""

    - [ ] [The Linux User's Toolkit for Discovering New Apps](https://www.makeuseof.com/tag/linux-users-toolkit-discovering-new-apps/)

## Namespace

+ [ ] [Углубленное знакомство с пространствами имен Linux. Часть 1(Habr)](https://habr.com/ru/company/ruvds/blog/592057/)
+ [ ] [Углубленное знакомство с пространствами имен Linux. Часть 2(Habr)](https://habr.com/ru/company/ruvds/blog/593335/)

## Tutorials

### LUKS disks setup

!!! info ""

    + [Detached LUKS header full disk encryption with encrypted keyfile inside a passphrase-protected bootable keydisk using direct UEFI secure boot, encrypted swap, unbound with DNSCrypt and DNSSEC, and system hardening](https://www.reddit.com/r/archlinux/comments/7np36m/detached_luks_header_full_disk_encryption_with/)
    + [YubiKey Full Disk Encryption](https://github.com/agherzan/yubikey-full-disk-encryption)

#### Step 1 - Creating KeyDisk(s)

1. Find out block device mappings and locate the keydisk for setting up.

    ```bash
    lsblk -o FSAVAIL,FSUSE%,SIZE,VENDOR,MODEL,NAME,UUID,SERIAL
    ```

2. Shred whole data in the disk.

    ```bash
    dd if=/dev/urandom of=/dev/mmcblk0 bs=4096
    ```

3. Prepare the disk: create partitions - use following command and then type in options below.

    ```bash
    sudo gdisk /dev/mmcblk0
    ```

    !!! note

        `n` is new partition, `L` shows all hex codes for filesystems (EF00, 8300), `t` allows you to change a filesystem after creating a partition

    + `n` <br/>
    + `1` <br/>
    + `2048` <br/>
    + `+512M` <br/>
    + `EF00` <br/>
    + `n` <br/>
    + `2` <br/>
    + `(Hit enter to accept the automatic start value here)` <br/>
    + `(Hit enter to accept the automatic end value here)` <br/>
    + `8300` <br/>
    + `w` - write changes <br/>
    + `q` - quit

4. LUKS encrypt previously created second partition(the bigger one) in conjaction with Yubikey using `ykfde` tool.

    ```bash
    sudo ykfde-format --cipher=twofish-xts-plain64 --key-size=512 --hash=sha512 -i 30000 /dev/mmcblk0p2
    ```

    !!! attention

        `sudo ykfde-format ...` - It will ask for setting up the password, use the one from "Other: YUBIKEY_YKFDE secret challenge" entry in KeepassXC db.

    !!! note

        the `-i` is for iteration time in milliseconds for the key derivation function pbkdf, it should be at least 5000 (5 seconds), but preferably put it as high as you can stand

5. Unlock encripted partition and name it 'cryptboot'. Format it to `ext2`.

    ```bash
    keepassxc-cli show -a Password -y 1 --no-password "<KeepassXC-db-path>" "Other: YUBIKEY_YKFDE secret challenge" | sudo ykfde-open -d /dev/mmcblk0p2 -n cryptboot
    mkfs.ext2 /dev/mapper/cryptboot
    ```

    !!! note

        ext2 is for simplicity and to avoid journaling since it's just a mmc card(or usb drive)

6. Mount 'cryptboot' to  `/mnt` and copy all necessary staff from other KeyDisks(or create new ones if needed) and then unmount and lock it.

    ```bash
    sudo mount /dev/mapper/cryptboot /mnt
    .
    .
    .
    # creation of key.img file for EncDisks(if needed)
    cd /mnt
    dd if=/dev/urandom of=key.img bs=20M count=1
    sudo ykfde-format --align-payload=1 --cipher=serpent-xts-plain64 --key-size=512 --hash=sha512 -i 30000 key.img
    .
    .
    .
    sudo umount /mnt
    udisksctl lock -b /dev/mmcblk0p2
    ```

    !!! attention

        `sudo ykfde-format ...` - It will ask for setting up the password, use the one from "Other: YUBIKEY_YKFDE secret challenge" entry in KeepassXC db.

#### Step 2 - Creating EncDisk(s)

1. Instead of unmounting and locking 'cryptboot' unlock and mount `/mnt/img.key` as `lukskey`

    ```bash

    ```
