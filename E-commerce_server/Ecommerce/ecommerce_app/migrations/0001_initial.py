# Generated by Django 4.2.5 on 2023-09-14 19:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='.images/')),
                ('brand', models.CharField(blank=True, max_length=200, null=True)),
                ('category', models.CharField(blank=True, choices=[('Fashion and Apparel', 'Fashion and Apparel'), ('Electronics and Gadgets', 'Electronics and Gadgets'), ('Home and Furniture', 'Home and Furniture'), ('Health and Wellness', 'Health and Wellness'), ('Food and Groceries', 'Food and Groceries')], max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]